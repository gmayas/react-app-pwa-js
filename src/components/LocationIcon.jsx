import L from "leaflet";
import IconLocation from "../assets/location.svg";

export const LocationIcon = L.icon({
  iconUrl: IconLocation,
  iconRetinaUrl: IconLocation,
  popupAnchor: [0, -20],
  iconSize: [25, 25]
});