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

export const getUserListService = async ({ page, pageSize }) => {
  const data = await request.get(
    `/rest/users?page=${page}&per_page=${pageSize}&q=`
  );
  return data;
};

export const deleteUserService = async (uid) => {
  await request.delete(`rest/users/${uid}`);
};

export const getUserRolesService = async (uid) => {
  const userInfo = await request.get(
    `/rest/users/${uid}?fields=headline;social_link;location`
  );
  return userInfo.roles;
};

export const updateUserRolesService = async (uid, roleIds) => {
  await request.post(`/assignRole/${uid}`, { roleIds });
};
