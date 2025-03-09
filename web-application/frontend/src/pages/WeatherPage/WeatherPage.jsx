import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Footer from "../../components/Footer/Footer";

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
                  <div
                    style={{
                      width: "230px",
                      padding: "14px",
                      backgroundColor: "#1A1A1A",
                      borderRadius: "12px",
                      boxShadow: "0px 6px 12px rgba(255, 0, 0, 0.5)",
                      textAlign: "center",
                      fontFamily: "Arial, sans-serif",
                      color: "white",
                      border: "2px solid red",
                    }}
                  >
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
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default WeatherComponent;