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
  //var newPostion = false;

  useEffect( () => {
    navigator.geolocation.watchPosition(
      async (pos) => {
        //newPostion = true;
        //console.log("newPostion:", newPostion);
        locationfound.LatLng = [pos.coords.latitude, pos.coords.longitude];
        //console.log("locationfound:", locationfound);
        const userData = await currentUser.value;
        //console.log("userData:", userData);
        position = {
          userData,
          LatLng: locationfound.LatLng,
        };
        //console.log("position:", position);
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
  }, []);

  useEffect(async () => {
    const map = L.map("mapid");
    const socket = await socketBackEnd();
    socket.on("userListRefreshMap", (userList) => {
      //console.log("userListRefreshMap ", true);
      MapFunction(map, userList);
      userList = [];
    });
  }, []);

  const MapFunction = (map, userList) => {
    setTimeout(() => {
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
      map.setView(coords, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> by GMayaS © ${today.getFullYear()}`,
      }).addTo(map);
      /* L.marker(coords, { icon: LocationIcon }).addTo(map)
    .bindPopup('You are here.')
    .openPopup();*/
      userList.map((v, i, a) => {
        // Elemento devuelto de nuevo_array
        if (v.nickName === "Gab") {
          v.position = [21.161908, -86.842020202];
        }
        L.marker(v.position, { icon: LocationIcon })
          .addTo(map)
          .bindPopup(`User: ${v.nickName}`)
          .openPopup();
      });
      //newPostion = false;
    }, 5000);
  };

  return <div id="mapid"></div>;
};

export default MapView;
