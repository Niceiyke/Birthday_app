import axios from 'axios';

const api = axios.create({
    baseURL: 'https://birthday-app-eta.vercel.app/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;
