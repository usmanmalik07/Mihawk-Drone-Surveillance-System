import React, { useState } from "react";
import "./Results.css";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Chart.js ko import karna zaroori hai
import Sidebar from "../../components/Sidebar/Sidebar"; // Sidebar ko import kiya
import Footer from "../../components/Footer/Footer";

const Results = () => {
  // Dummy Data for Reports
  const [reportType, setReportType] = useState("daily"); // "daily" or "weekly"
  
  const dailyData = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    datasets: [
      {
        label: "Detections per Day",
        data: [12, 19, 8, 15, 22, 10, 5], // Dummy values
        backgroundColor: "#007bff",
      },
    ],
  };

  const weeklyData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Detections per Week",
        data: [65, 78, 45, 90], // Dummy values
        backgroundColor: "#28a745",
      },
    ],
  };

  return (
    <div className="footer">
    <div className="main">
    <div className="Side"><Sidebar /></div>
    <div className="results-page">
      

      {/* Main Content */}
      <div className="reports-container">
        <h2>Reports</h2>

        {/* Tabs for switching Daily/Weekly */}
        <div className="tabs">
          <button className={reportType === "daily" ? "active" : ""} onClick={() => setReportType("daily")}>
            Daily
          </button>
          <button className={reportType === "weekly" ? "active" : ""} onClick={() => setReportType("weekly")}>
            Weekly
          </button>
        </div>

        {/* Chart Display */}
        <div className="chart-container">
          <Bar data={reportType === "daily" ? dailyData : weeklyData} />
        </div>

        {/* Report Table */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Detections</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {(reportType === "daily"
                ? [
                    { date: "2025-03-01", detections: 12 },
                    { date: "2025-03-02", detections: 19 },
                    { date: "2025-03-03", detections: 8 },
                  ]
                : [
                    { date: "Week 1", detections: 65 },
                    { date: "Week 2", detections: 78 },
                    { date: "Week 3", detections: 45 },
                  ]
              ).map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.detections}</td>
                  <td>
                    <button className="view-btn">View</button>
                  </td>
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
