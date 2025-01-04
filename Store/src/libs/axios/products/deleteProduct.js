import instance from "..";

export const deleteProduct = async (id) => {
    const {data, status} = await instance.delete(`/products/${id}`);
    return {data, status};
}