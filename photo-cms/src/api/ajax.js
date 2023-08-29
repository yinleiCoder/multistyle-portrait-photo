import axios from "axios";
import { ElMessage } from "element-plus";
import { getItem, removeAllItems } from "../utils/storage";
import { TOKEN } from "../constants";
import { isTokenTimeout } from "../utils/auth";

const instance = axios.create({
  timeout: 10 * 1000,
  baseURL: "http://localhost:3000/web/api",
});

instance.interceptors.request.use(
  (config) => {
    if (getItem(TOKEN)) {
      if (isTokenTimeout()) {
        removeAllItems();
        ElMessage.error("token失效，请重新登录获取token");
        return Promise.reject(new Error("token失效，请重新登录获取token"));
      }
      config.headers["Authorization"] = `Bearer ${getItem(TOKEN)}`;
    }
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
    ElMessage.error(err);
    return Promise.reject(err);
  }
);

export default instance;
