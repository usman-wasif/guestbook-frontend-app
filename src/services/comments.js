import axios from 'axios';
import { API_CONFIG } from '../config/api';

export const fetchComments = async () => {
    const response = await axios.get(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COMMENTS.BASE}`);
    return response.data;
};

export const submitComment = async (comment) => {
    const response = await axios.post(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COMMENTS.BASE}`, {
        comment,
    });
    return response.data;
};

export const markCommentAsSpam = async (id) => {
    const response = await axios.patch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COMMENTS.MARK_SPAM(id)}`);
    return response.data;
};

export const deleteComment = async (id) => {
    await axios.delete(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.COMMENTS.DELETE(id)}`);
}; 