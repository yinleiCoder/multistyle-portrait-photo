import axios from "axios";
import { getToken } from "../utils/token";

const instance = axios.create({
  timeout: 10 * 1000,
  baseURL: "http://localhost:3000/web/api",
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = `Bearer ${getToken()}`;
    return config;
  },
  (err) => Promise.reject(err)
);

instance.interceptors.response.use(
  (res) => {
    const responseData = res.data || {};
    return responseData;
  },
  (err) => {
    // element ui error message todo
    return Promise.reject(err);
  }
);

export default instance;
