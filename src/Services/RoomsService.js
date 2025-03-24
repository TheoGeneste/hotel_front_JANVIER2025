import axios from "axios";
const API_URL = import.meta.env.VITE_URL_API;

function getRooms() {
  return axios.get(API_URL + "rooms");
}
function createRoom(room) {
  return axios.post(API_URL + "rooms", room);
}
function updateRoom(room) {
  return axios.patch(API_URL + "rooms/" + room.id_room, room);
}
function deleteRoom(id) {
  return axios.delete(API_URL + "rooms/" + id);
}
export default { getRooms, createRoom, updateRoom, deleteRoom };