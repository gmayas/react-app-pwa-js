import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LocationIcon } from "./LocationIcon";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  const [position, setPosition] = useState(null);
  useEffect(() => {
    navigator.geolocation.watchPosition(
      async (pos) => {
        console.log("watchPosition: ", {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      (error) => {
        console.error("Error Code = " + error.code + " - " + error.message);
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  const LocationMarker = () => {
    return position === null ? null : (
      <MapContainer center={position} zoom={14} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> GMayaS C:\>Desarrollo en Sistemas.'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={LocationIcon}>
          <Popup>You are here</Popup>
        </Marker>
      </MapContainer>
    );
  };

  return <LocationMarker />;
};

export default MapView;
