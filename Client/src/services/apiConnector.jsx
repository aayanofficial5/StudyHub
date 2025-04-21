import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const apiConnector = (method, url, body, headers) => {
  return axiosInstance({
    url,
    method,
    data: body || null,
    headers: headers || null,
  });
};
