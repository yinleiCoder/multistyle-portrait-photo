import request from "./ajax";

export async function getUserInfoService(uid) {
  const newUser = await request.get(
    `/rest/users/${uid}?fields=headline;social_link;location`
  );
  return newUser;
}

export async function updateUserInfoService({ _id, ...rest }) {
  await request.put(`/rest/users/${_id}`, {
    ...rest,
  });
}
