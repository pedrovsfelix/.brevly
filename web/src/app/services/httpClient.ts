import axios from "axios";

export const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
})

httpClient.interceptors.response.use(async data => {
  return data;
})