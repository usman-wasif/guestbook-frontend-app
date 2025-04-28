export const API_CONFIG = {
    BASE_URL: process.env.VUE_APP_API_URL || 'http://localhost:3000',
    WS_URL: process.env.VUE_APP_WS_URL || 'ws://localhost:3000',
    ENDPOINTS: {
        AUTH: {
            LOGIN: '/login',
            LOGOUT: '/admin/logout',
        },
        COMMENTS: {
            BASE: '/comments',
            MARK_SPAM: (id) => `/comments/${id}/mark_spam`,
            DELETE: (id) => `/comments/${id}`,
        },
    },
    CHANNELS: {
        COMMENTS: 'CommentsChannel',
    },
    MAX_COMMENTS: 50,

    STORAGE_KEYS: {
        JWT_TOKEN: 'jwt_token',
    },
};

export const AUTH_HEADER = 'Authorization'; 
