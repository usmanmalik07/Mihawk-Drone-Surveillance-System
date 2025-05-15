import React, { createContext, useContext, useState, useCallback } from 'react';

const DetectionAlertContext = createContext();

export const useDetectionAlert = () => {
  const context = useContext(DetectionAlertContext);
  if (!context) {
    throw new Error('useDetectionAlert must be used within a DetectionAlertProvider');
  }
  return context;
};

export const DetectionAlertProvider = ({ children }) => {
  const [detection, setDetection] = useState(null);

  const showDetectionAlert = useCallback((data) => {
    console.log('Showing detection alert:', data);
    setDetection(data);
  }, []);

  const clearDetectionAlert = useCallback(() => {
    console.log('Clearing detection alert');
    setDetection(null);
  }, []);

  const value = {
    detection,
    showDetectionAlert,
    clearDetectionAlert
  };

  return (
    <DetectionAlertContext.Provider value={value}>
      {children}
    </DetectionAlertContext.Provider>
  );
};