import instance from "..";

export const allOrders = async () => {
    const response = await instance.get("/order");
    return response.data;
    };