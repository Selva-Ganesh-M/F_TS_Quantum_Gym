import axios from "axios";

export type TPayload<T> = {
  status: string,
  message: string,
  payload: T
}

export const api = axios.create({
    baseURL: 'http://localhost:4000',
    // timeout: 1000*3,
    withCredentials: true,
    headers: {'X-Custom-Header': 'foobar'},
  });