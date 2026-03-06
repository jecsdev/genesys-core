import axios from 'axios';

const API_URL = 'https://localhost:44312/api';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const getCompanies = () =>
  axios.get(`${API_URL}/company`, getAuthHeader());

export const getCompany = (id) =>
  axios.get(`${API_URL}/company/${id}`, getAuthHeader());

export const createCompany = (data) =>
  axios.post(`${API_URL}/company`, data, getAuthHeader());

export const updateCompany = (id, data) =>
  axios.put(`${API_URL}/company/${id}`, data, getAuthHeader());

export const deleteCompany = (id) =>
  axios.delete(`${API_URL}/company/${id}`, getAuthHeader());