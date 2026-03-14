import axios from 'axios';

const API_URL = 'https://localhost:44312/api';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const getAffiliates = () =>
  axios.get(`${API_URL}/affiliate`, getAuthHeader());

export const getAffiliate = (id) =>
  axios.get(`${API_URL}/affiliate/${id}`, getAuthHeader());

export const getAffiliateByCedula = (identification) =>
  axios.get(`${API_URL}/affiliate/cedula/${identification}`, getAuthHeader());

export const createAffiliate = (data) =>
  axios.post(`${API_URL}/affiliate`, data, getAuthHeader());

export const updateAffiliate = (id, data) =>
  axios.put(`${API_URL}/affiliate/${id}`, data, getAuthHeader());

export const deleteAffiliate = (id) =>
  axios.delete(`${API_URL}/affiliate/${id}`, getAuthHeader());