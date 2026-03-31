import axios from 'axios';

const API_URL = 'https://localhost:44312/api';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const getUsers = () =>
  axios.get(`${API_URL}/user`, getAuthHeader());

export const getUser = (id) =>
  axios.get(`${API_URL}/user/${id}`, getAuthHeader());

export const getProfile = () =>
  axios.get(`${API_URL}/user/profile`, getAuthHeader());

export const createUser = (data) =>
  axios.post(`${API_URL}/user`, data, getAuthHeader());

export const updateUser = (id, data) =>
  axios.put(`${API_URL}/user/${id}`, data, getAuthHeader());

export const updateProfile = (data) =>
  axios.put(`${API_URL}/user/profile`, data, getAuthHeader());

export const changePassword = (data) =>
  axios.put(`${API_URL}/user/change-password`, data, getAuthHeader());

export const deleteUser = (id) =>
  axios.delete(`${API_URL}/user/${id}`, getAuthHeader());