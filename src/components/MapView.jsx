import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import LocationMarkers from "./LocationMarkers";
import { getCurrentUser } from "../filesJS/userSubject";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  const [position, setPosition] = useState(null);
  const [userWatches, setUserWatches] = useState([]);
  useEffect(async () => {
    setPosition({});
    setUserWatches([]);
    navigator.geolocation.watchPosition(
      async (pos) => {
        let userData = await getCurrentUser();
        if (userData.Ok) {
          setPosition({
            userData,
            LatLng: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          });
          const newUserWatches = [
            ...userWatches,
            {
              nickName: userData.nickName,
              position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
              online: userData.Ok
            },
          ];
          setUserWatches(newUserWatches);
        }
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
      <MapContainer center={position.LatLng} zoom={13} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> GMayaS C:\>Desarrollo en Sistemas.'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarkers locations={userWatches} />
      </MapContainer>
    );
  };

  return <LocationMarker />;
};

export default MapView;
