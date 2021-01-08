import React, { useEffect, useState } from "react";
import L from "leaflet";
import { LocationIcon } from "./LocationIcon";
import { getCurrentUser } from "../filesJS/userSubject";
import "leaflet/dist/leaflet.css";
import socketBackEnd from "../filesJS/socketBackEnd";

const MapView = () => {
  var position = {};
  useEffect(async () => {
    const map = L.map("mapid");
    map.locate({ enableHighAccuracy: true, watch: true });
    map.on("locationfound", async (e) => {
      L.DomEvent.preventDefault(e);
      map.eachLayer((layer) => {
        layer.remove();
      });
      const { lat, lng } = e.latlng;
      let coords = [lat, lng];
      let userData = await getCurrentUser();
      console.log("coords:", coords);
      map.setView(coords, 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> by GMayaS © 2020.',
      }).addTo(map);
     /* L.marker(coords, { icon: LocationIcon }).addTo(map)
      .bindPopup('You are here.')
      .openPopup();*/
      console.log("userData:", userData);
      if (userData.Ok) {
        position = {
          userData,
          LatLng: coords,
        };
        const socket = await socketBackEnd();
        socket.emit("userCoordinates", position); //Emite un evento del socket
        // Se escucha el evento userCoordinates y secreo un marcador nuevo por cada usuario.
        socket.on("newUserCordinates", (userList) => {
          console.log("newUserCordinates: ", userList);
          userList.map(async (v, i, a) => {
            // Elemento devuelto de nuevo_array
            //if (userList[i].nickName =='Gab') { userList[i].position = [21.161908, -86.8420202020]}
            await new L.marker(v.position, { icon: LocationIcon })
              .addTo(map)
              .bindPopup(`User: ${v.nickName}`)
              //.openPopup();
          });
        });
      }
    });
  }, []);

  return <div id="mapid"></div>;
};

export default MapView;
