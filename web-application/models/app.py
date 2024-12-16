import cv2

rtsp_url = "rtsp://@192.168.100.5:1945"  # Replace with your URL

cap = cv2.VideoCapture(rtsp_url)

if not cap.isOpened():
    print("Error: Unable to connect to RTSP stream.")
else:
    print("RTSP stream connected successfully. Reading frames...")
    while True:
        ret, frame = cap.read()
        if not ret:
            print("No frame received. Exiting...")
            break

        cv2.imshow("RTSP Stream Test", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
