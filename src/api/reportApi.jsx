import axios from 'axios';

const API_URL = 'https://localhost:44312/api';

const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    responseType: 'blob'
  }
});

const downloadFile = (data, filename) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
};

export const downloadCompaniesReport = async () => {
  const res = await axios.get(`${API_URL}/report/companies`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    responseType: 'blob'
  });
  downloadFile(res.data, `empresas_${new Date().toISOString().slice(0,10)}.xlsx`);
};

export const downloadAffiliatesReport = async () => {
  const res = await axios.get(`${API_URL}/report/affiliates`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    responseType: 'blob'
  });
  downloadFile(res.data, `titulares_${new Date().toISOString().slice(0,10)}.xlsx`);
};

export const downloadDependentsReport = async () => {
  const res = await axios.get(`${API_URL}/report/dependents`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    responseType: 'blob'
  });
  downloadFile(res.data, `dependientes_${new Date().toISOString().slice(0,10)}.xlsx`);
};

export const downloadAffiliatesByCompanyReport = async () => {
  const res = await axios.get(`${API_URL}/report/affiliates-by-company`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    responseType: 'blob'
  });
  downloadFile(res.data, `titulares_por_empresa_${new Date().toISOString().slice(0,10)}.xlsx`);
};