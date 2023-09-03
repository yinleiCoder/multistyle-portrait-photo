import request from "./ajax";

// RBAC
export const priorityListService = async () => {
  const data = await request.get("/rest/priorities/");
  return data;
};

export const rolePrioritiesService = async (roleId) => {
  const data = await request.get(`/rest/roles/${roleId}?fields=`);
  return data;
};