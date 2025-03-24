import axios from "axios";
const API_URL = import.meta.env.VITE_URL_API;

function getClients() {
  return axios.get(API_URL + "clients");
}

function createClient(client) {
  return axios.post(API_URL + "clients", client);
}

function updateClient(client) {
  return axios.patch(API_URL + "clients/" + client.id_client, client);
}

function deleteClient(id) {
  return axios.delete(API_URL + "clients/" + id);
}

export default { getClients, createClient, updateClient, deleteClient };