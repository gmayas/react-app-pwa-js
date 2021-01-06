import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import { LocationIcon } from "./LocationIcon";
import { getCurrentUser } from "../filesJS/userSubject";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  const [position, setPosition] = useState(null);
  useEffect(async () => {
    setPosition({});
    navigator.geolocation.watchPosition(
      async (pos) => {
        let userData = await getCurrentUser();
        console.log("userData: ", userData);
        if (userData.Ok) {
          console.log("watchPosition: ", {
            userData,
            LatLng: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          });
          setPosition({
            userData,
            LatLng: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          });
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
      <MapContainer center={position.LatLng} zoom={15} scrollWheelZoom={true}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> GMayaS C:\>Desarrollo en Sistemas.'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position.LatLng} icon={LocationIcon}>
          <Popup>
            <h6 className="text-info">User: {position?.userData?.nickName}</h6>
            <h6 className="text-success">Lat: {position?.LatLng?.lat}</h6>
            <h6 className="text-success">lng: {position?.LatLng?.lng}</h6>
          </Popup>
          <Tooltip direction="left" sticky offset={[-10, -2]} opacity={1} permanent>
            <a className="text-info"><i className="fas fa-user"></i><strong> {position?.userData?.nickName}</strong></a>
          </Tooltip>
        </Marker>
      </MapContainer>
    );
  };

  return <LocationMarker />;
};

export default MapView;
