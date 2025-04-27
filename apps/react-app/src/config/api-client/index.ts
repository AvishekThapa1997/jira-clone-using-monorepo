import axios, { CreateAxiosDefaults } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosPublic = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: false,
});

const axiosPrivate = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export { axiosPublic, axiosPrivate };
