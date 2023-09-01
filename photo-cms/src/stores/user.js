import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { TOKEN } from "../constants";
import { setTimeStamp } from "../utils/auth";
import { loginService, getUserInfoService } from "../api/sys";
import { getItem, setItem, removeAllItems } from "../utils/storage";

export const useUserStore = defineStore(
  "user",
  () => {
    const tokenRef = ref(getItem(TOKEN) || "");
    const userRef = ref({});
    
    function setToken(token) {
      tokenRef.value = token;
      setItem(TOKEN, token);
    }

    function setUserInfo(user) {
      userRef.value = user;
    }

    // 登录
    function login(userInfo) {
      const { username, password } = userInfo;
      return new Promise((resolve, reject) => {
        loginService({ username, password })
          .then((data) => {
            setToken(data.token);
            setUserInfo(data.user);
            // 用户被动退出之主动处理: 时效token
            setTimeStamp();
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    }

    // 主动退出、被动退出登录(单点登录、token失效)
    function logout() {
      tokenRef.value = "";
      userRef.value = {};
      removeAllItems();
    }

    // 获取当前用户信息
    async function getUserInfo() {
      const userInfo = await getUserInfoService(userRef.value._id);
      setUserInfo(userInfo);
      return userInfo;
    }

    return { login, tokenRef, userRef, getUserInfo, logout };
  },
  {
    persist: {
      paths: ["userRef"],
    },
  }
);
