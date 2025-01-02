import instance from "..";

export const login = async (data) => {
  const response = await instance.post("/auth/login", data);
  return {message: response.data, status: response.status};
}
