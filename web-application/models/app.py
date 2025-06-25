import os
from dotenv import load_dotenv
from pathlib import Path
import torch
import torchvision.transforms as T
from ultralytics import YOLO
import cv2
import threading
import queue
from fastapi import FastAPI, Query, HTTPException
from fastapi.responses import JSONResponse, HTMLResponse, StreamingResponse
import uvicorn
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from fastapi import WebSocket, WebSocketDisconnect
import json
import base64
import asyncio
from pymongo import MongoClient
from bson import ObjectId
import time
from fastapi import Form 

# Load environment variables
dotenv_path = Path(__file__).parent / '.env'
load_dotenv(dotenv_path)

app = FastAPI()

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Setup
try:
    mongo_client = MongoClient(os.getenv("MONGO_URI"))
    db = mongo_client["security_system"]
    verified_threats = db["verified_threats"]
    print("✅ MongoDB connected successfully")
    # Test the connection
    db.command('ping')
    print("✅ Database ping successful")
except Exception as e:
    print(f"❌ MongoDB connection failed: {e}")
    verified_threats = None

# Global state
unverified_detections = {}
connected_clients = []
frame_queue = queue.Queue(maxsize=10)
rtsp_url = "rtsp://192.168.100.39:1945/"
frame_width = 640
frame_height = 480

# Models
models = {
    "yolov8n": YOLO("bes.pt"),
    "trained": YOLO("bes.pt"),
    "yolov8s": YOLO("yolov8s.pt"),
    "yolov5": YOLO("yolov5s.pt"),
}

@app.websocket("/ws/detections")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    connected_clients.append(websocket)
    print(f"New client connected. Total clients: {len(connected_clients)}")
    
    try:
        while True:
            data = await websocket.receive_text()
            if data == "ping":
                await websocket.send_text("pong")
    except (WebSocketDisconnect, Exception) as e:
        connected_clients.remove(websocket)
        print(f"WebSocket disconnected: {e}")

async def store_temp_detection(item_name, frame):
    detection_id = str(ObjectId())
    timestamp = datetime.now()
    
    # Resize and encode frame
    frame_resized = cv2.resize(frame, (640, 480))
    _, buffer = cv2.imencode('.jpg', frame_resized)
    frame_base64 = base64.b64encode(buffer).decode('utf-8')
    
    detection = {
        "_id": detection_id,
        "item": item_name,
        "timestamp": timestamp.isoformat(),
        "frame": frame_base64,
    }
    
    print(f"New detection: {item_name} at {timestamp}")
    unverified_detections[detection_id] = detection
    
    # Send to all connected clients
    for client in connected_clients:
        try:
            await client.send_text(json.dumps(detection))
        except Exception as e:
            print(f"Error sending to client: {e}")
            continue
    
    return detection_id


@app.post("/verify_threat/{detection_id}")
async def verify_threat(
    detection_id: str,
    user_email: str = Form(...),
    is_real: bool = Form(True)
) -> dict:
    global verified_threats, db
    
    try:
        # Check and reinitialize connection if needed
        if verified_threats is None or not db.command('ping').get('ok'):
            try:
                mongo_client = MongoClient(os.getenv("MONGO_URI"))
                db = mongo_client["security_system"]
                verified_threats = db["verified_threats"]
                print("✅ Reconnected to MongoDB")
            except Exception as e:
                raise HTTPException(
                    status_code=503,
                    detail="Database service unavailable"
                )

        detection = unverified_detections.get(detection_id)
        if not detection:
            raise HTTPException(
                status_code=404,
                detail="Detection not found or already processed"
            )

        if is_real:
            verified_threat = {
                "_id": ObjectId(detection_id),
                "item": detection["item"],
                "timestamp": detection["timestamp"],
                "frame": detection["frame"],
                "verified": True,
                "verified_by": user_email,
                "verified_at": datetime.now().isoformat()
            }
            
            result = verified_threats.insert_one(verified_threat)
            if not result.inserted_id:
                raise HTTPException(
                    status_code=500,
                    detail="Failed to save threat to database"
                )
            
            print(f"✅ Saved threat {result.inserted_id} to collection")

        # Remove from unverified regardless of is_real
        unverified_detections.pop(detection_id, None)
        
        return {
            "status": "success",
            "threat_id": detection_id,
            "verified": is_real
        }

    except HTTPException:
        raise  # Re-raise FastAPI HTTP exceptions
    except Exception as e:
        print(f"🚨 Verification error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail="An unexpected error occurred during verification"
        )
    
@app.get("/get_all_threats")
def get_all_threats(
    limit: int = Query(12, gt=0, le=100),
    skip: int = Query(0, ge=0)
):
    try:
        if verified_threats is None:
            raise HTTPException(status_code=503, detail="Database service unavailable")
        
        threats = list(verified_threats.find(
            {"verified": True}, 
            {
                "_id": 1, 
                "item": 1, 
                "timestamp": 1, 
                "frame": 1,
                "verified": 1, 
                "verified_by": 1,
                "verified_at": 1
            }
        ).sort("timestamp", -1).skip(skip).limit(limit))
        
        for threat in threats:
            threat["_id"] = str(threat["_id"])
        
        total = verified_threats.count_documents({"verified": True})
        
        return {
            "threats": threats,
            "total": total,
            "limit": limit,
            "skip": skip
        }
    except Exception as e:
        print(f"Database operation failed: {e}")
        raise HTTPException(status_code=500, detail="Failed to fetch threat data")
    
    
@app.get("/get_threat/{threat_id}")
async def get_threat(threat_id: str):
    try:
        if verified_threats is None:
            raise HTTPException(status_code=503, detail="Database service unavailable")
        
        threat = verified_threats.find_one({"_id": ObjectId(threat_id)})
        if not threat:
            raise HTTPException(status_code=404, detail="Threat not found")
        
        threat["_id"] = str(threat["_id"])
        return threat
        
    except Exception as e:
        print(f"Error fetching threat: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch threat")

# Debug endpoint
@app.get("/debug_db")
def debug_db():
    if verified_threats is None:
        return {"status": "Database not connected"}
    return {
        "collection_exists": "verified_threats" in db.list_collection_names(),
        "total_documents": verified_threats.count_documents({}),
        "verified_threats": verified_threats.count_documents({"verified": True})
    }

def process_frame(frame, model_name):
    model = models[model_name]
    results = model(frame)

    threat_types = ["pistol", "gun", "weapon"]
    for box in results[0].boxes:
        class_id = int(box.cls[0])
        conf = float(box.conf[0])  # Get confidence score
        item_name = model.names[class_id]
        
        if item_name.lower() in threat_types and conf >= 0.7:
            asyncio.run(store_temp_detection(item_name, frame, conf))
    
    return results[0].plot()


def generate_frames(model_name):
    while True:
        try:
            frame = frame_queue.get(timeout=5)
            processed_frame = process_frame(frame, model_name)
            _, buffer = cv2.imencode('.jpg', processed_frame)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
        except queue.Empty:
            continue

def get_rtsp_frame(rtsp_url):
    cap = cv2.VideoCapture(rtsp_url, cv2.CAP_FFMPEG)
    if not cap.isOpened():
        print("Error: Unable to connect to RTSP stream")
        return
    
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
    while True:
        ret, frame = cap.read()
        if not ret:
            time.sleep(0.1)
            continue
        frame_resized = cv2.resize(frame, (frame_width, frame_height))
        if not frame_queue.full():
            frame_queue.put(frame_resized)
    cap.release()

@app.get("/video_feed")
async def video_feed(model: str = Query("trained")):
    if model not in models:
        return HTMLResponse("Invalid model selected", status_code=400)
    return StreamingResponse(
        generate_frames(model),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )

if __name__ == "__main__":
    # Start RTSP frame reader thread
    threading.Thread(target=get_rtsp_frame, args=(rtsp_url,), daemon=True).start()
    
    # Start FastAPI server
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8003,
        ws='websockets',
        ws_ping_interval=20,
        ws_ping_timeout=20
    )