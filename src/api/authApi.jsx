import axios from 'axios';

const API_URL = 'https://localhost:44312/api';

export const loginRequest = (credentials) =>
  axios.post(`${API_URL}/auth/login`, credentials);