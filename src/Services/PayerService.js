import axios from "axios";
const API_URL = import.meta.env.VITE_URL_API;

function getPayers() {
  return axios.get(API_URL + "payers");
}

function getPayerById(id) {
  return axios.get(API_URL + "payers/" + id);
}

function createPayer(payer) {
  return axios.post(API_URL + "payers", payer);
}
function updatePayer(payer) {
  return axios.patch(API_URL + "payers/" + payer.id_payer, payer);
}
function deletePayer(id) {
  return axios.delete(API_URL + "payers/" + id);
}
export default { getPayers, createPayer, updatePayer, deletePayer, getPayerById };