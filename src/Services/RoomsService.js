import axios from "axios";
const API_URL = import.meta.env.VITE_URL_API;

function getRooms() {
  return axios.get(API_URL + "rooms");
}

export default { getRooms };