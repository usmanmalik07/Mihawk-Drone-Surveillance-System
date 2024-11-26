from flask import Flask, request, render_template, Response
import cv2
import numpy as np

app = Flask(__name__)

# Route to serve the video stream (from PC camera or another video source)
@app.route('/')
def index():
    return render_template('index.html')  # Serve the frontend (HTML page)

# This route will handle the POST request from the mobile device, containing the video frame
@app.route('/upload', methods=['POST'])
def upload_frame():
    # Get the image from the incoming POST request (mobile camera feed)
    file = request.files['file']
    
    # Read the image as bytes and convert it to a numpy array
    nparr = np.frombuffer(file.read(), np.uint8)
    
    # Decode the image into an OpenCV format
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
    # Process the frame (e.g., apply machine learning model for object detection)
    # For simplicity, let's just draw a rectangle on the frame
    if frame is not None:
        height, width = frame.shape[:2]
        cv2.rectangle(frame, (50, 50), (width-50, height-50), (0, 255, 0), 2)

    # Optionally, you could save the frame, or send it back to the client as processed
    _, buffer = cv2.imencode('.jpg', frame)  # Encode the frame as JPEG
    return Response(buffer.tobytes(), content_type='image/jpeg')  # Send back processed frame

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  # Make the app accessible on local network
