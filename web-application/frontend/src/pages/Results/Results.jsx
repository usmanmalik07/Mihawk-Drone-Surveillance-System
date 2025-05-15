import React, { useState, useEffect } from "react";
import "./Results.css";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Results = () => {
  const [reportType, setReportType] = useState("daily");
  const [detectionCounts, setDetectionCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetections = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch("http://localhost:8003/get_all_threats?limit=100"); // Using existing endpoint
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (!data?.threats || !Array.isArray(data.threats)) {
          throw new Error("Invalid data format received");
        }

        // Process data to count threat types
        const counts = data.threats.reduce((acc, threat) => {
          const item = threat.item?.toLowerCase() || 'unknown';
          acc[item] = (acc[item] || 0) + 1;
          return acc;
        }, {});

        setDetectionCounts(counts);
      } catch (error) {
        console.error("Error fetching detections:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetections();
  }, []);

  // Chart configuration
  const chartData = {
    labels: Object.keys(detectionCounts),
    datasets: [
      {
        label: "Number of Detections",
        data: Object.values(detectionCounts),
        backgroundColor: "#ff3b3b",
        borderColor: "#ff3b3b",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#fff',
        }
      },
      title: {
        display: true,
        text: 'Threat Detection Analytics',
        color: '#fff',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#fff',
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        }
      },
      x: {
        ticks: {
          color: '#fff',
        },
        grid: {
          color: 'rgba(255,255,255,0.1)',
        }
      }
    }
  };

  return (
    <div className="footer">
      <div className="main">
        <div className="Side"><Sidebar /></div>
        <div className="results-page">
          <div className="reports-container">
            <h2>Threat Detection Analytics</h2>

            {/* Time Period Tabs */}
            <div className="tabs">
              <button 
                className={reportType === "daily" ? "active" : ""}
                onClick={() => setReportType("daily")}
              >
                Daily
              </button>
              <button 
                className={reportType === "weekly" ? "active" : ""}
                onClick={() => setReportType("weekly")}
              >
                Weekly
              </button>
            </div>

            {loading ? (
              <div className="loading-message">Loading analytics data...</div>
            ) : error ? (
              <div className="error-message">Error: {error}</div>
            ) : (
              <>
                {/* Chart Display */}
                <div className="chart-container">
                  <Bar data={chartData} options={chartOptions} />
                </div>

                {/* Report Table */}
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Threat Type</th>
                        <th>Count</th>
                        <th>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(detectionCounts).map(([item, count], index) => {
                        const total = Object.values(detectionCounts).reduce((a, b) => a + b, 0);
                        const percentage = ((count / total) * 100).toFixed(1);
                        
                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.charAt(0).toUpperCase() + item.slice(1)}</td>
                            <td>{count}</td>
                            <td>{percentage}%</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Results;