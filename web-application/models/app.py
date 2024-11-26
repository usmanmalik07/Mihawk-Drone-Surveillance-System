from flask import Flask, render_template, Response
import cv2

app = Flask(__name__)

# Initialize the camera (this will later be used for streaming)
# For now, it's a placeholder for your actual mobile stream
video_capture = cv2.VideoCapture(0)  # If using PC webcam
# If you have a specific video stream URL, replace it with that URL instead

def generate_frames():
    while True:
        success, frame = video_capture.read()  # Read the current frame from webcam
        if not success:
            break
        else:
            # Encode the frame to JPEG
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            # Yield the frame in the multipart format
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')

@app.route('/')
def index():
    return render_template('index.html')  # You can create a simple HTML page to display the video

@app.route('/video')
def video():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  # Make sure it's accessible to your mobile device
