from flask import Flask, Response
from ultralytics import YOLO
import cv2
import threading
import queue
import time

# Load YOLOv8n model
model = YOLO('yolov8n.pt')  # Replace with your custom model if needed

# Flask application
app = Flask(__name__)

# Queue for asynchronous processing
frame_queue = queue.Queue(maxsize=10)
def get_frame(rtsp_url):
    """Read frames from RTSP stream."""
    cap = cv2.VideoCapture(rtsp_url)
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)  # Reduce buffer to avoid lag
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        yield frame
    cap.release()

def rtsp_thread(rtsp_url):
    """Thread to read frames asynchronously and put them in the queue."""
    for frame in get_frame(rtsp_url):
        if not frame_queue.full():
            frame_queue.put(frame)

def process_frame(frame):
    """Process a frame using YOLO model and return annotated frame."""
    results = model.predict(source=frame, show=False)  # Run inference
    annotated_frame = results[0].plot()  # Annotate frame
    return annotated_frame

def generate_frames():
    """Generate frames for the Flask route."""
    while True:
        if not frame_queue.empty():
            frame = frame_queue.get()
            start_time = time.time()  # For debugging timing
            frame = cv2.resize(frame, (640, 480))  # Resize frame for faster processing
            processed_frame = process_frame(frame)
            print("Processing time per frame:", time.time() - start_time)  # Debug info
            _, buffer = cv2.imencode('.jpg', processed_frame)
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + buffer.tobytes() + b'\r\n')

@app.route('/video_feed')
def video_feed():
    """Flask route for video feed."""
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    rtsp_url = "rtsp://192.168.100.38:8554/stream"  # Replace with your RTSP stream URL
    threading.Thread(target=rtsp_thread, args=(rtsp_url,), daemon=True).start()  # Start RTSP thread
    app.run(host='0.0.0.0', port=5000, debug=True)
