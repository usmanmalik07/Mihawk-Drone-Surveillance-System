from flask import Flask, Response
from ultralytics import YOLO
import cv2

# Load YOLOv8n model
model = YOLO('yolov8n.pt')

app = Flask(__name__)
rtsp_url = "rtsp://192.168.100.38:8554/stream"
def get_frame(rtsp_url):
    cap = cv2.VideoCapture(rtsp_url)
    while True:
        ret, frame = cap.read()
        if not ret:
            break
        yield frame
    cap.release()

def process_frame(frame):
    results = model.predict(source=frame, show=False)  # Run YOLOv8 inference
    annotated_frame = results[0].plot()  # Annotate the frame
    return annotated_frame

@app.route('/video_feed')
def video_feed():
    rtsp_url = "rtsp://your_mobile_rtsp_url"
    return Response(generate_frames(rtsp_url), mimetype='multipart/x-mixed-replace; boundary=frame')

def generate_frames(rtsp_url):
    for frame in get_frame(rtsp_url):
        processed_frame = process_frame(frame)  # Process the frame
        _, buffer = cv2.imencode('.jpg', processed_frame)  # Encode to JPEG
        frame_bytes = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
