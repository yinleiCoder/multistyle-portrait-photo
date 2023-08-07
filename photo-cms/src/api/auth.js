import { removeToken, setToken } from "../utils/token";
import { removeUser, saveUser } from "../utils/user";
import request from "./ajax";

export async function registerService(username, password) {
  const result = await request.post("/register", {
    username,
    password,
  });
  setToken(result.token);
  saveUser(result.user);
  return result.user;
}

export async function loginService(username, password) {
  const result = await request.post("/login", {
    username,
    password,
  });
  setToken(result.token);
  saveUser(result.user);
  return result.user;
}

export async function logoutService() {
  removeToken();
  removeUser();
}
