import axios from "axios";
const API_URL = import.meta.env.VITE_URL_API;

function getServices() {
    return axios.get(API_URL + "services");
}

export default { getServices };