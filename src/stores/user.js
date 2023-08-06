import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { getUser, saveUser } from "../utils/user";
import { loginService, logoutService, registerService } from "../api/auth";

export const useUserStore = defineStore("user", () => {
  const user = ref(getUser());

  async function registerUser({ username, password }) {
    const registeredUser = await registerService(username, password);
    user.value = registeredUser;
  }

  async function loginUser({ username, password }) {
    const loginedUser = await loginService(username, password);
    user.value = loginedUser;
  }

  async function logoutUser() {
    logoutService();
    user.value = {};
  }

  function updateUserInfo(newUserInfo) {
    user.value = newUserInfo;
    saveUser(newUserInfo);
  }

  return { user, registerUser, loginUser, logoutUser, updateUserInfo };
});
