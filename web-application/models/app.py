import torch
import torchvision.transforms as T
from ultralytics import YOLO
import cv2
import threading
import queue
from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse, HTMLResponse, StreamingResponse
import uvicorn
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware

# FastAPI application
app = FastAPI()

# Define the allowed origins (in this case, your frontend URL)
origins = [
    "http://localhost:3000",  # React app running on localhost:3000
    "http://127.0.0.1:3000",  # Localhost variant
]

# Add the CORSMiddleware to FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Allows all origins listed in the 'origins' list
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

# Thread-safe Queue for frames
frame_queue = queue.Queue(maxsize=10)

# Detected items list (item, timestamp)
detected_items = []

# RTSP settings
rtsp_url = "rtsp://@192.168.100.5:1945"  # Replace with your RTSP URL
frame_width = 720
frame_height = 720

# Device selection (GPU if available, otherwise CPU)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load models
models = {
    "yolov8n": YOLO("best.pt"),  # YOLOv8n model
    "yolov8s": YOLO("yolov8s.pt"),  # YOLOv8s model
    "yolov5": YOLO("yolov5s.pt"),  # YOLOv5 model (small version)
}
# model = models["yolov8n"]
# model.train(data='../models/data.yaml', epochs=50, imgsz=640)
# Preprocessing for YOLOv5
transform = T.ToTensor()


def store_detection(item_name):
    """Store the detected item and its timestamp."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    detected_items.append({"item": item_name, "timestamp": timestamp})

def get_rtsp_frame(rtsp_url):
    """Capture frames from RTSP stream and add to the queue."""
    cap = cv2.VideoCapture(rtsp_url, cv2.CAP_FFMPEG)
    if not cap.isOpened():
        print("Error: Unable to connect to RTSP stream.")
        return
    print("RTSP stream connected successfully.")
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)  # Reduce buffering

    while True:
        ret, frame = cap.read()
        if not ret:
            print("No frame received. Check RTSP stream.")
            break

        # Resize frame for better performance
        frame_resized = cv2.resize(frame, (frame_width, frame_height))
        if not frame_queue.full():
            frame_queue.put(frame_resized)
    cap.release()

def process_frame_yolo(frame, model_name):
    """Run YOLOv5 or YOLOv8 model detection on a single frame."""
    model = models[model_name]
    results = model(frame)  # Run inference
    if results:
        for result in results[0].boxes.xywh:
            store_detection("Detected Object")  # Example of detection
    annotated_frame = results[0].plot()  # Annotate frame with predictions
    return annotated_frame

def generate_frames(model_name):
    """Generate processed frames for video feed."""
    while True:
        try:
            frame = frame_queue.get(timeout=5)  # Fetch a frame from the queue

            # Process using the selected YOLO model
            processed_frame = process_frame_yolo(frame, model_name)

            # Encode frame as JPEG
            _, buffer = cv2.imencode('.jpg', processed_frame, [cv2.IMWRITE_JPEG_QUALITY, 70])

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
        except queue.Empty:
            print("Frame queue is empty. Waiting for frames...")

# Route to get detections for the report page (returns JSON now)
@app.get("/get_detections")
async def get_detections():
    """API to get the list of detected items with timestamps."""
    return JSONResponse(content={"detections": detected_items})  # Return JSON response

@app.get("/", response_class=HTMLResponse)
async def home():
    """Home page with links to different model video feeds."""
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Drone Surveillance System</title>
    </head>
    <body>
        <h1>YOLO Detection Streams</h1>
        <p>Choose a video feed:</p>
        <ul>
            <li><a href="/video_feed?model=yolov8n">YOLOv8n</a></li>
            <li><a href="/video_feed?model=yolov8s">YOLOv8s</a></li>
            <li><a href="/video_feed?model=yolov5">YOLOv5</a></li>
            <li><a href="/get_detections">View Detection Report</a></li>
        </ul>
    </body>
    </html>
    """
    return html_content

@app.get("/video_feed")
async def video_feed(model: str = Query("yolov8n", description="Model name: yolov8n, yolov8s, or yolov5")):
    """Route for the video stream with dynamic model selection."""
    if model not in models:
        return HTMLResponse("<h1>Invalid model selected. Use 'yolov8n', 'yolov8s', or 'yolov5'.</h1>", status_code=400)

    return StreamingResponse(generate_frames(model), media_type="multipart/x-mixed-replace; boundary=frame")

if __name__ == "__main__":
    # Start RTSP stream capture thread
    threading.Thread(target=get_rtsp_frame, args=(rtsp_url,), daemon=True).start()

    # Run FastAPI server
    uvicorn.run(app, host="0.0.0.0", port=8000)
