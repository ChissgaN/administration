import instance from "..";

export const findOrder = async (id) => {

    const response = await instance.get(`/order/${id}`);
    return response.data;
}