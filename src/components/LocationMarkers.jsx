import React from "react";
import { Marker, Tooltip } from "react-leaflet";
import { LocationIcon } from "./LocationIcon";
import MarkerPopup from "./MarkerPopup";

const LocationMarkers = (props) => {
  const { locations } = props;
  console.log('locations:' , locations)
  const markers = locations.map((loc, i) => (
    <Marker key={i} position={loc.position} icon={LocationIcon}>
      <MarkerPopup nickName={loc.nickName} position={loc.position} />
      <Tooltip direction="left" sticky offset={[-10, -2]} opacity={1} permanent>
        <a className="text-danger">
          <i className="fas fa-user"></i>
          <strong> {loc.nickName}</strong>
        </a>
      </Tooltip>
    </Marker>
  ));
  return <>{markers}</>;
};

export default LocationMarkers;
