import axios from 'axios';

import {API_URL} from '../utils/helper';

axios.defaults.headers.common['Content-Type'] = 'application/json';

let accessToken = JSON.parse(localStorage.getItem('accessToken'));
axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;

export default axios.create({
    baseURL : API_URL,
    responseType: "json"
});