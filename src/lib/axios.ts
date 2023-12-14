import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const apiAuth = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});
