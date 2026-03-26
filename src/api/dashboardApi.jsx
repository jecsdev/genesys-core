import axios from 'axios';

const API_URL = 'https://localhost:44312/api';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
});

export const getDashboardStats = () =>
  axios.get(`${API_URL}/dashboard/stats`, getAuthHeader());