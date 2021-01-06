import React from "react";
import { Popup } from "react-leaflet";

const MarkerPopup = (props) => {
  const { nickName, position } = props;
  return (
    <Popup>
      <div>
        <h6 className="text-info"><i className="fas fa-user"></i><strong> {nickName}</strong></h6>
        <h6 className="text-success">Lat: <strong>{position?.lat}</strong></h6>
        <h6 className="text-success">Lng: <strong>{position?.lng}</strong></h6>
        </div>
    </Popup>
  );
};

export default MarkerPopup;
