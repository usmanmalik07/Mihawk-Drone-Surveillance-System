import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";
import "./Weather.css"; // Add this CSS file for styling

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
});

const WeatherComponent = () => {
  const [position, setPosition] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [prevCoords, setPrevCoords] = useState(null);
  const [showDetails, setShowDetails] = useState(false); // Toggle detailed weather

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);

          if (!prevCoords || (prevCoords[0] !== latitude && prevCoords[1] !== longitude)) {
            setPrevCoords([latitude, longitude]);
            fetchWeatherData(latitude, longitude);
          }
        },
        (err) => {
          console.error("Geolocation Error:", err);
          setError("Location access denied.");
          setLoading(false);
        },
        { enableHighAccuracy: true, maximumAge: 10000 }
      );
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, [prevCoords]);

  const fetchWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${"be913cd74bac4894b6c194223250903"}&q=${latitude},${longitude}`
      );
      setWeather(response.data);
    } catch (err) {
      console.error("Weather API Error:", err);
      setError("Failed to fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div style={{ display: "flex", height: "120vh" }}>
      <Sidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, position: "relative", padding: "10px" }}>
          {position ? (
            <MapContainer
              center={position}
              zoom={12}
              style={{ height: "120vh", width: "100%", zIndex: 0 }}
              className="leaflet-container"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={position} icon={customIcon}>
                <Popup>
                  <div className="weather-popup">
                    {error ? (
                      <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
                    ) : loading ? (
                      <p style={{ color: "gray" }}>Loading weather...</p>
                    ) : weather ? (
                      <>
                        <h3 style={{ color: "red", fontSize: "18px", marginBottom: "5px" }}>
                          {weather.location.name}, {weather.location.country}
                        </h3>
                        <p style={{ fontSize: "16px", fontWeight: "bold", color: "#FFD700" }}>
                          🌡 {weather.current.temp_c}°C
                        </p>
                        <p style={{ fontSize: "14px", color: "#B0B0B0" }}>
                          {weather.current.condition.text}
                        </p>
                      </>
                    ) : (
                      <p>No weather data available.</p>
                    )}
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          ) : (
            <p style={{ textAlign: "center", color: "white", fontSize: "18px" }}>
              {error ? error : "Fetching your location..."}
            </p>
          )}

          {/* Weather Panel on Top Right */}
          {weather && (
            <div className="weather-panel" onClick={toggleDetails}>
              <h3>{weather.location.name}</h3>
              <p>🌡 {weather.current.temp_c}°C</p>
              <p>{weather.current.condition.text}</p>
            </div>
          )}

          {/* Detailed Weather Modal */}
          {showDetails && weather && (
            <div className="weather-modal">
              <div className="modal-content">
                <h3>{weather.location.name}, {weather.location.country}</h3>
                <p>🌡 Temperature: {weather.current.temp_c}°C</p>
                <p>💧 Humidity: {weather.current.humidity}%</p>
                <p>🌬 Wind: {weather.current.wind_kph} km/h</p>
                <p>🌞 Feels Like: {weather.current.feelslike_c}°C</p>
                <p>☁ Condition: {weather.current.condition.text}</p>
                <button onClick={toggleDetails}>Close</button>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default WeatherComponent;