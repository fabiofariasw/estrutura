import axios from 'axios';

export const api = axios.create({
    baseURL: 'http://colocarapi.com',
    timeout: 5000,
})