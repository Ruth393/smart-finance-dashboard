import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15_000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const detail =
      error.response?.data?.detail ??
      error.response?.data?.message ??
      error.message;

    if (status === 401) {
      localStorage.removeItem('auth_token');
      window.dispatchEvent(new CustomEvent('auth:unauthorized'));
    }

    const normalizedError = {
      status: status ?? 0,
      message: typeof detail === 'string' ? detail : 'An unexpected error occurred',
      detail: error.response?.data ?? null,
      original: error,
    };

    if (import.meta.env.DEV) {
      console.error('[API Error]', normalizedError);
    }

    return Promise.reject(normalizedError);
  },
);

export default api;
export { API_BASE_URL };
