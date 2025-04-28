import { API_CONFIG } from '../config/api';
import api from '@/config/apiClient';

export const fetchComments = async () => {
    const response = await api.get(`${API_CONFIG.ADMIN_BASE_URL}${API_CONFIG.ENDPOINTS.COMMENTS.BASE}`);
    return response.data;
};

export const fetchUserComments = async () => {
    const response = await api.get(`${API_CONFIG.USER_BASE_URL}${API_CONFIG.ENDPOINTS.COMMENTS.BASE}`);
    return response.data;
};

export const submitComment = async (comment) => {
    const response = await api.post(`${API_CONFIG.USER_BASE_URL}${API_CONFIG.ENDPOINTS.COMMENTS.BASE}`, {
        comment,
    });
    return response.data;
};

export const markCommentAsSpam = async (id) => {
    const response = await api.patch(`${API_CONFIG.ADMIN_BASE_URL}${API_CONFIG.ENDPOINTS.COMMENTS.MARK_SPAM(id)}`);
    return response.data;
};

export const deleteComment = async (id) => {
    await api.delete(`${API_CONFIG.ADMIN_BASE_URL}${API_CONFIG.ENDPOINTS.COMMENTS.DELETE(id)}`);
}; 