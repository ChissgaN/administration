import instance from "..";

export const logout = async () => {
  const response = await instance.get("/auth/logout");
  return { message: response.data, status: response.status };
};
