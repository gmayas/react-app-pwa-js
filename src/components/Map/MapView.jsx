import React, { useEffect } from "react";
import L from "leaflet";
import { LocationIcon } from "./LocationIcon";
import { getCurrentUser, currentUser } from "../../filesJS/userSubject";
import socketBackEnd from "../../filesJS/socketBackEnd";
import * as _ from "lodash";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  var position = {};
  var locationfound = {};

  useEffect(async  () => {
    const userData = await getCurrentUser();
    if ( userData.Ok ) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          locationfound.LatLng = [pos.coords.latitude, pos.coords.longitude];
          position = {
            userData,
            LatLng: locationfound.LatLng,
          };
          const socket = await socketBackEnd();
          socket.emit("userCoordinates", position);
        },
        (error) => {
          console.error("Error Code = " + error.code + " - " + error.message);
        },
        {
          enableHighAccuracy: true,
        }
      );
    }
   
  }, []);

  useEffect(async () => {
    const map = L.map("mapid");
    const socket = await socketBackEnd();
    socket.on("userListRefreshMap", (userList) => {
      MapFunction(map, userList);
      userList = [];
    });
  }, []);

  const MapFunction = (map, userList) => {
      map.eachLayer((layer) => {
        layer.remove();
      });
      let coords = [];
      if (!_.has(locationfound, "LatLng")) {
        coords = position.LatLng;
      } else {
        coords = locationfound.LatLng;
      }
      const today = new Date();
      map.setView(coords, 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> by GMayaS © ${today.getFullYear()}`,
      }).addTo(map);
      /* L.marker(coords, { icon: LocationIcon }).addTo(map)
    .bindPopup('You are here.')
    .openPopup();*/
      userList.map((v, i, a) => {
        L.marker(v.position, { icon: LocationIcon })
          .addTo(map)
          .bindPopup(`User: ${v.nickName}`)
          //.openPopup();
      });
  };

  return <div id="mapid"></div>;
};

export default MapView;
