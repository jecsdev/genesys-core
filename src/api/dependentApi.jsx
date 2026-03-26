import axios from 'axios';

const API_URL = 'https://localhost:44312/api';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const getDependents = () =>
  axios.get(`${API_URL}/dependent`, getAuthHeader());

export const getDependent = (id) =>
  axios.get(`${API_URL}/dependent/${id}`, getAuthHeader());

export const getDependentsByAffiliate = (affiliateId) =>
  axios.get(`${API_URL}/dependent/affiliate/${affiliateId}`, getAuthHeader());

export const createDependent = (data) =>
  axios.post(`${API_URL}/dependent`, data, getAuthHeader());

export const updateDependent = (id, data) =>
  axios.put(`${API_URL}/dependent/${id}`, data, getAuthHeader());

export const deleteDependent = (id) =>
  axios.delete(`${API_URL}/dependent/${id}`, getAuthHeader());