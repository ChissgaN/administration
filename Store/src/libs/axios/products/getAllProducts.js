import instance from "..";

export const getAllProducts = async () => {
    const { data } = await instance.get("/products");
    return data;
}