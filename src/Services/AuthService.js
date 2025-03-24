import axios from "axios";
import { jwtDecode } from "jwt-decode";
const API_URL = import.meta.env.VITE_URL_API;

function login(user){
    return axios.post(API_URL+"auth/login", user);
}

function logout(){
    window.localStorage.removeItem('token');
    delete axios.defaults.headers['Authorization'];
}

function isConnected(){
    const token = window.localStorage.getItem('token');
    if(token){
        const data = jwtDecode(token);
        if(data.exp * 1000 > new Date().getTime()){
            axios.defaults.headers['Authorization'] = 'Bearer ' + token;
            return true;
        }
    }
    logout();
    return false;
}

function getRole(){
    const token = window.localStorage.getItem('token');
    if(token){
        const data = jwtDecode(token);
        return data.role;
    }
    return '';
}

function getUser(){
    const token = window.localStorage.getItem('token');
    if(token){
        const data = jwtDecode(token);
        return {
            id: data.id,
            email: data.email,
            nom : data.nom,
            prenom : data.prenom
        }
    }
    return {};
}

export default { login, isConnected, getRole, getUser, logout };