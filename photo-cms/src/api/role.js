import request from "./ajax";

// RBAC
export const roleListService = async () => {
  const data = await request.get("/rest/roles/");
  return data;
};
