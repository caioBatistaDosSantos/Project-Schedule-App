import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

export const SET_TOKEN = (token) => {
  api.defaults.headers.common.Authorization = token;
};

export const GET = async (endpoint, body) => {
  const { data } = await api.get(endpoint, body);
  return data;
};

export const POST = async (endpoint, body, header) => {
  const { data } = await api.post(endpoint, body, header);
  return data;
};

export const PUT = async (endpoint, body, header) => {
  const { data } = await api.put(endpoint, body, header);
  return data;
};

export const DELETE = async (endpoint, body) => {
  const { data } = await api.delete(endpoint, body);
  return data;
};

export default api;
