import axios from 'axios';

const API_URL = 'https://localhost:44312/api';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const getServicePlans = () =>
  axios.get(`${API_URL}/serviceplan`, getAuthHeader());

export const getServicePlan = (id) =>
  axios.get(`${API_URL}/serviceplan/${id}`, getAuthHeader());

export const createServicePlan = (data) =>
  axios.post(`${API_URL}/serviceplan`, data, getAuthHeader());

export const updateServicePlan = (id, data) =>
  axios.put(`${API_URL}/serviceplan/${id}`, data, getAuthHeader());

export const deleteServicePlan = (id) =>
  axios.delete(`${API_URL}/serviceplan/${id}`, getAuthHeader());