import axios from "axios";
import { ElMessage } from "element-plus";
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
    ElMessage.error(err.response.data.message);
    return Promise.reject(err);
  }
);

export default instance;
