import axios from "axios";

export const api = axios.create({
    baseURL: 'http://localhost:5000/api/',
    // timeout: 1000*3,
    withCredentials: true,
    headers: {'X-Custom-Header': 'foobar'},
  });