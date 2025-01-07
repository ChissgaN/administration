import instance from "..";

export const createOrder = async (order) => {
    const { data, status } = await instance.post("/order", order);
    return { data, status };
  };