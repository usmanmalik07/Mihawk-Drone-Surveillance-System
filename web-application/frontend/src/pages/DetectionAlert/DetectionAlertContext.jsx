import React, { createContext, useContext, useState } from "react";

const DetectionAlertContext = createContext();

export const useDetectionAlert = () => useContext(DetectionAlertContext);

export const DetectionAlertProvider = ({ children }) => {
  const [detection, setDetection] = useState(null);

  const showDetectionAlert = (data) => setDetection(data);
  const clearDetectionAlert = () => setDetection(null);

  return (
    <DetectionAlertContext.Provider value={{ detection, showDetectionAlert, clearDetectionAlert }}>
      {children}
    </DetectionAlertContext.Provider>
  );
};
