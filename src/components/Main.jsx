import React, { useEffect, useState } from "react";
import Chat from "../components/ChatComponent/Chat/Chat";
import MapView from "../components/Map/MapView";

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
