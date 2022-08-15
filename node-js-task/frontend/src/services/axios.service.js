import {baseURL} from '../configs';

const axios = require('axios');

const axiosService = axios.create({baseURL});

export {
    axiosService
};