import axios from "axios";
const API_URL = import.meta.env.VITE_URL_API;

function getReservations() {
  return axios.get(API_URL + "reservations");
}

function createReservation(reservation) {
  return axios.post(API_URL + "reservations", reservation);
}

function updateReservation(reservation) {
  return axios.patch(API_URL + "reservations/" + reservation.id_reservation, reservation);
}

function deleteReservation(id) {
  return axios.delete(API_URL + "reservations/" + id);
}

export default { getReservations, createReservation, updateReservation, deleteReservation };