from fastapi import FastAPI
from fastapi.responses import StreamingResponse, HTMLResponse
from ultralytics import YOLO
import cv2
import threading
import time

# Load YOLOv8n model
model = YOLO('yolov8n.pt')  # Replace with your custom model if needed

# FastAPI application
app = FastAPI()

# Queue for asynchronous processing
frame_queue = []

# Set target frame size (width x height)
frame_width = 320
frame_height = 240

def get_rtsp_frame(rtsp_url):
    cap = cv2.VideoCapture(rtsp_url)
    if not cap.isOpened():
        print("Failed to connect to RTSP stream.")
        return
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)
    while True:
        ret, frame = cap.read()
        if not ret:
            print("No frame received. Check RTSP stream.")
            break
        # Resize the frame to a smaller size for faster processing
        frame_resized = cv2.resize(frame, (frame_width, frame_height))
        frame_queue.append(frame_resized)  # Add the resized frame to the queue
    cap.release()

def process_frame(frame):
    """Process a frame using YOLO model and return annotated frame."""
    results = model.predict(source=frame, show=False)  # Run inference
    annotated_frame = results[0].plot()  # Annotate frame
    return annotated_frame

def generate_frames():
    """Generate frames for the FastAPI route."""
    while True:
        if len(frame_queue) > 0:
            frame = frame_queue.pop(0)  # Get a frame from the queue
            processed_frame = process_frame(frame)
            
            # Compress the frame to reduce size (adjust quality for smaller size)
            _, buffer = cv2.imencode('.jpg', processed_frame, [cv2.IMWRITE_JPEG_QUALITY, 70])  # 70% quality
            
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

@app.get("/", response_class=HTMLResponse)
async def home():
    """Default route that shows a welcome page with a link to the video stream."""
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Drone Surveillance System</title>
    </head>
    <body>
        <h1>Welcome to the Drone Surveillance System</h1>
        <p>Go to <a href="/video_feed">/video_feed</a> to view the video stream.</p>
    </body>
    </html>
    """
    return html_content

@app.get("/video_feed")
async def video_feed():
    """Route for video feed."""
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace; boundary=frame")

def test_rtsp(rtsp_url):
    cap = cv2.VideoCapture(rtsp_url)
    if not cap.isOpened():
        print("Error: Unable to connect to RTSP stream.")
    else:
        print("RTSP stream is accessible.")
    cap.release()

if __name__ == "__main__":
    import uvicorn
    rtsp_url = "rtsp://admin:admin@192.168.100.6:1935"  # Replace with your RTSP stream URL
    test_rtsp(rtsp_url)  # Test RTSP URL first

    # Start the RTSP frame capture in a separate thread
    threading.Thread(target=get_rtsp_frame, args=(rtsp_url,), daemon=True).start()

    # Run the FastAPI app
    uvicorn.run(app, host="0.0.0.0", port=8000)
