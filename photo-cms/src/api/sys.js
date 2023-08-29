import request from "./ajax";

export const loginService = (data) => {
  const { username, password } = data;
  return request.post("/login", {
    username,
    password,
  });
};

export const getUserInfoService = async (uid) => {
  const userInfo = await request.get(
    `/rest/users/${uid}?fields=headline;social_link;location`
  );
  return userInfo;
};
