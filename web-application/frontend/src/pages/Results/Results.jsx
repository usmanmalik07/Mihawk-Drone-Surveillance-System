import React, { useState, useEffect } from "react";
import "./Results.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";

const Results = () => {
  const [reportType, setReportType] = useState("daily"); // "daily" or "weekly"
  const [detectionCounts, setDetectionCounts] = useState({}); // Store counts of detections

  useEffect(() => {
    const fetchDetections = async () => {
      try {
        const response = await fetch("http://localhost:8002/get_detections"); // Backend API
        const data = await response.json();
        
        // Process data: Count occurrences of each detected object
        const counts = data.detections.reduce((acc, detection) => {
          acc[detection.item] = (acc[detection.item] || 0) + 1;
          return acc;
        }, {});

        setDetectionCounts(counts);
      } catch (error) {
        console.error("Error fetching detections:", error);
      }
    };

    fetchDetections();
  }, []);

  // Prepare chart data
  const chartData = {
    labels: Object.keys(detectionCounts), // Detected object names
    datasets: [
      {
        label: "Detection Count",
        data: Object.values(detectionCounts), // Counts
        backgroundColor: "#007bff",
      },
    ],
  };

  return (
    <div className="footer">
      <div className="main">
        <div className="Side"><Sidebar /></div>
        <div className="results-page">
          <div className="reports-container">
            <h2>Detection Reports</h2>

            {/* Chart Display */}
            <div className="chart-container">
              <Bar data={chartData} />
            </div>

            {/* Report Table */}
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Detection Name</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(detectionCounts).map(([item, count], index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item}</td>
                      <td>{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Results;
