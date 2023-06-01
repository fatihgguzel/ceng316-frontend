import axios from 'axios';

const api = axios.create({
    baseURL: 'https://2ezdp3xwgd.eu-west-1.awsapprunner.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;