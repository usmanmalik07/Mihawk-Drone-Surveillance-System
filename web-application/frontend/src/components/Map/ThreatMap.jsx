import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const ThreatMap = ({ location }) => {
  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '8px'
  };

  const center = {
    lat: location.lat,
    lng: location.lon
  };

  return (
    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false
        }}
      >
        <Marker 
          position={center} 
          icon={{
            url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
};

export default ThreatMap;