import api from './api.js';

const healthService = {
  getRoot: () => api.get('/'),
  getHealth: () => api.get('/health'),
};

export default healthService;
