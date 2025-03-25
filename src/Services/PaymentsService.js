import axios from "axios";
const API_URL = import.meta.env.VITE_URL_API;

function getPayments() {
  return axios.get(API_URL + "payments");
}

function getPaymentById(id) {
  return axios.get(API_URL + "payments/" + id);
}

function createPayment(payment) {
  return axios.post(API_URL + "payments", payment);
}
function updatePayment(payment) {
  return axios.patch(API_URL + "payments/" + payment.id_payment, payment);
}
function deletePayment(id) {
  return axios.delete(API_URL + "payments/" + id);
}
export default { getPayments, createPayment, updatePayment, deletePayment, getPaymentById };