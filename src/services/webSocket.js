import { API_CONFIG } from '@/config/api';

export const setupWebSocket = (onMessage) => {
    const ws = new WebSocket(`${API_CONFIG.WS_URL}/cable`);

    ws.onopen = () => {
        ws.send(
            JSON.stringify({
                command: 'subscribe',
                identifier: JSON.stringify({ channel: API_CONFIG.CHANNELS.COMMENTS }),
            })
        );
    };

    ws.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            if (data.type === 'ping') return;
            if (data.message) {
                onMessage(data.message);
            }
        } catch (err) {
            console.error('Error processing WebSocket message:', err);
        }
    };

    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };

    return ws;
}; 