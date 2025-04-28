import axios from 'axios';
import { API_CONFIG, AUTH_HEADER } from '@/config/api';
import { getToken } from '@/services/auth';

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
});

// attach JWT automatically
api.interceptors.request.use(cfg => {
    const t = getToken();
    if (t) cfg.headers[AUTH_HEADER] = `Bearer ${t}`;
    return cfg;
});

export default api;