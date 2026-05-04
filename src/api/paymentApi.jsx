import axios from 'axios';

const API_URL = 'https://localhost:44312/api';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const getPayments = () =>
  axios.get(`${API_URL}/payment`, getAuthHeader());

export const getPaymentsByAffiliate = (affiliateId) =>
  axios.get(`${API_URL}/payment/affiliate/${affiliateId}`, getAuthHeader());

export const getAccountStatus = (affiliateId) =>
  axios.get(`${API_URL}/payment/account-status/${affiliateId}`, getAuthHeader());

export const createPayment = (data) =>
  axios.post(`${API_URL}/payment`, data, getAuthHeader());

export const updatePayment = (id, data) =>
  axios.put(`${API_URL}/payment/${id}`, data, getAuthHeader());

export const deletePayment = (id) =>
  axios.delete(`${API_URL}/payment/${id}`, getAuthHeader());