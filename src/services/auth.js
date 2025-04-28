import api from '@/config/apiClient';
import { API_CONFIG } from '@/config/api';

export const getToken = () =>
    localStorage.getItem(API_CONFIG.STORAGE_KEYS.JWT_TOKEN);

export const setToken = token =>
    localStorage.setItem(API_CONFIG.STORAGE_KEYS.JWT_TOKEN, token);

export const removeToken = () =>
    localStorage.removeItem(API_CONFIG.STORAGE_KEYS.JWT_TOKEN);

export const handleAuthError = (err, logoutCallback) => {
    if (err.response?.status === 401) {
        logoutCallback();
        return 'Session expired. Please log in again.';
    }
    return err.response?.data?.error || 'An error occurred';
};

export const login = async (username, password) => {
    const { data } = await api.post(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
        username,
        password,
    });
    setToken(data.token);
    return data.token;
};

export const logout = async () => {
    try {
        await api.delete(API_CONFIG.ENDPOINTS.AUTH.LOGOUT);
    } catch (err) {
        console.error('Failed to logout:', err);
    }
    finally {
        removeToken();
    }
};