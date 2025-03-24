import axios from "axios";
const API_URL = import.meta.env.VITE_URL_API;

function getServices() {
    return axios.get(API_URL + "services");
}

function createService(service) {
    return axios.post(API_URL + "services", service);
}

function updateService(service) {
    return axios.patch(API_URL + "services/" + service.id_service, service);
}

function deleteService(id) {
    return axios.delete(API_URL + "services/" + id);
}


export default { getServices, createService, updateService, deleteService };