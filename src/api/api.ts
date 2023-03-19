import axios from "axios";

export type TPayload<T> = {
  statusText: string;
  statusCode: number;
  message: string;
  payload: T;
};

export const api = axios.create({
  // baseURL: "https://quantum-gym-server.onrender.com/api",
  baseURL: "http://localhost:4000/api",
  // timeout: 1000*3,
  withCredentials: true,
  headers: { "X-Custom-Header": "foobar" },
});
