import axios from "axios";
const API_URL = import.meta.env.VITE_URL_API;

function getInclure() {
  return axios.get(API_URL + "inclures");
}

function createInclure(Inclure) {
  return axios.post(API_URL + "inclures", Inclure);
}

function updateInclure(Inclure) {
  return axios.patch(API_URL + "inclures/" + Inclure.id_Inclure, Inclure);
}

function deleteInclure(id) {
  return axios.delete(API_URL + "inclures/" + id);
}

function getServiceForReservations(id) {
  return axios.get(API_URL + "inclures/reservation/" + id);
}

export default { getServiceForReservations, getInclure, createInclure, updateInclure, deleteInclure };