import instance from "..";

export const getProfile = async () => {
  const response = await instance.get("/auth/profile");
  return response.data;
};
