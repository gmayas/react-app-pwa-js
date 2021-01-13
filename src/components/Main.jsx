import React, { useEffect, useState } from "react";
import Chat from "../components/ChatComponents/Chat/Chat";
import MapView from "../components/MapComponents/Map/MapView";

const Main = () => {
  return (
    <div className="conteiner-block">
      <div className="row ">
        <div className="col-sm-8 mapContn">
          <MapView />
        </div>
        <div className="col-sm-4 myBackground">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Main;
