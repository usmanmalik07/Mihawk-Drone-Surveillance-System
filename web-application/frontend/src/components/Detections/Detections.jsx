import React, { useState, useEffect } from 'react';

// This is just an example, in practice this would be handled by your detection model logic.
function DetectionComponent() {
  const [detections, setDetections] = useState([]);

  // Simulate detection with random data
  const detectItem = (item) => {
    const timestamp = new Date().toLocaleTimeString();
    setDetections((prevDetections) => [
      ...prevDetections,
      { item, timestamp },
    ]);
  };

  // Simulate item detection
  useEffect(() => {
    const interval = setInterval(() => {
      const item = "Item " + Math.floor(Math.random() * 100);
      detectItem(item);
    }, 5000); // Detect a new item every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div>
      <h3>Detection Component</h3>
      <ul>
        {detections.map((detection, index) => (
          <li key={index}>
            {detection.item} detected at {detection.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DetectionComponent;
