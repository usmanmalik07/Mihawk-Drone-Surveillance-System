from fastapi import FastAPI
from fastapi.responses import StreamingResponse, HTMLResponse
from ultralytics import YOLO
import cv2
import threading
import queue
import uvicorn

# Load YOLOv8n model
model = YOLO("yolov8n.pt")  # Ensure yolov8n.pt is in your working directory

# FastAPI application
app = FastAPI()

# Thread-safe Queue for frames
frame_queue = queue.Queue(maxsize=10)

# RTSP settings
rtsp_url = "rtsp://@100.88.3.157:1945"  # Replace with your RTSP URL
frame_width = 640
frame_height = 480


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


def process_frame(frame):
    """Run YOLOv8 model detection on a single frame."""
    results = model(frame)  # Run inference
    annotated_frame = results[0].plot()  # Annotate frame with predictions
    return annotated_frame


def generate_frames():
    """Generate processed frames for video feed."""
    while True:
        try:
            frame = frame_queue.get(timeout=5)  # Fetch a frame from the queue
            processed_frame = process_frame(frame)  # YOLOv8 detection

            # Encode frame as JPEG
            _, buffer = cv2.imencode('.jpg', processed_frame, [cv2.IMWRITE_JPEG_QUALITY, 70])

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
        except queue.Empty:
            print("Frame queue is empty. Waiting for frames...")


@app.get("/", response_class=HTMLResponse)
async def home():
    """Home page with a link to the video feed."""
    html_content = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Drone Surveillance System</title>
    </head>
    <body>
        <h1>YOLOv8 Detection Stream</h1>
        <p>View the video feed with detection: <a href="/video_feed">/video_feed</a></p>
    </body>
    </html>
    """
    return html_content


@app.get("/video_feed")
async def video_feed():
    """Route for the video stream with YOLOv8 detection."""
    return StreamingResponse(generate_frames(), media_type="multipart/x-mixed-replace; boundary=frame")


if __name__ == "__main__":
    # Start RTSP stream capture thread
    threading.Thread(target=get_rtsp_frame, args=(rtsp_url,), daemon=True).start()

    # Run FastAPI server
    uvicorn.run(app, host="0.0.0.0", port=8000)
