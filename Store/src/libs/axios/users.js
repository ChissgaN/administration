import instance from ".";

export const getAllUsers = async () => {
  const { data, status } = await instance.get("/users");
  return { data, status };
};

export const getUser = async (id) => {
  const { data, status } = await instance.get(`/users/${id}`);
  return { data, status };
};

export const createUser = async (user) => {
  const { data, status } = await instance.post("/users", user);
  return { data, status };
};

export const updateUser = async (id, user) => {
  const { data, status } = await instance.put(`/users/${id}`, user);
  return { data, status };
};

export const deleteUser = async (id) => {
  const { data, status } = await instance.delete(`/users/${id}`);
  return { data, status };
};

export default {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
};
