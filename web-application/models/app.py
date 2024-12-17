from fastapi import FastAPI, Query
from fastapi.responses import StreamingResponse, HTMLResponse
from ultralytics import YOLO
import cv2
import threading
import queue
import uvicorn
import torch
import torchvision.transforms as T
from torchvision.models.detection import fasterrcnn_resnet50_fpn

# FastAPI application
app = FastAPI()

# Thread-safe Queue for frames
frame_queue = queue.Queue(maxsize=10)

# RTSP settings
rtsp_url = "rtsp://@192.168.100.5:1945"  # Replace with your RTSP URL
frame_width = 640
frame_height = 480

# Load models
models = {
    "yolov8n": YOLO("yolov8n.pt"),  # YOLOv8n model
    "yolov8s": YOLO("yolov8s.pt"),  # YOLOv8s model
    "rcnn": fasterrcnn_resnet50_fpn(pretrained=True)  # Faster R-CNN model
}

# Set Faster R-CNN to evaluation mode
models["rcnn"].eval()

# Preprocessing for Faster R-CNN
transform = T.ToTensor()


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
    """Run YOLOv8 model detection on a single frame."""
    model = models[model_name]
    results = model(frame)  # Run inference
    annotated_frame = results[0].plot()  # Annotate frame with predictions
    return annotated_frame


def process_frame_rcnn(frame):
    """Run Faster R-CNN detection on a single frame."""
    frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)  # Convert BGR to RGB
    tensor_frame = transform(frame_rgb).unsqueeze(0)  # Convert to tensor

    # Perform inference
    outputs = models["rcnn"](tensor_frame)

    # Draw bounding boxes
    for box in outputs[0]['boxes'].detach().numpy():
        (x1, y1, x2, y2) = map(int, box)
        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
    return frame


def generate_frames(model_name):
    """Generate processed frames for video feed."""
    while True:
        try:
            frame = frame_queue.get(timeout=5)  # Fetch a frame from the queue

            if model_name == "rcnn":
                processed_frame = process_frame_rcnn(frame)  # Faster R-CNN detection
            else:
                processed_frame = process_frame_yolo(frame, model_name)  # YOLOv8 detection

            # Encode frame as JPEG
            _, buffer = cv2.imencode('.jpg', processed_frame, [cv2.IMWRITE_JPEG_QUALITY, 70])

            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')
        except queue.Empty:
            print("Frame queue is empty. Waiting for frames...")


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
        <h1>YOLO and Faster R-CNN Detection Streams</h1>
        <p>Choose a video feed:</p>
        <ul>
            <li><a href="/video_feed?model=yolov8n">YOLOv8n</a></li>
            <li><a href="/video_feed?model=yolov8s">YOLOv8s</a></li>
            <li><a href="/video_feed?model=rcnn">Faster R-CNN</a></li>
        </ul>
    </body>
    </html>
    """
    return html_content


@app.get("/video_feed")
async def video_feed(model: str = Query("yolov8n", description="Model name: yolov8n, yolov8s, or rcnn")):
    """Route for the video stream with dynamic model selection."""
    if model not in models:
        return HTMLResponse("<h1>Invalid model selected. Use 'yolov8n', 'yolov8s', or 'rcnn'.</h1>", status_code=400)

    return StreamingResponse(generate_frames(model), media_type="multipart/x-mixed-replace; boundary=frame")


if __name__ == "__main__":
    # Start RTSP stream capture thread
    threading.Thread(target=get_rtsp_frame, args=(rtsp_url,), daemon=True).start()

    # Run FastAPI server
    uvicorn.run(app, host="0.0.0.0", port=8000)
