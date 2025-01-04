import instance from "..";

export const createNewProduct = async (data) => {
    const response = await instance.post("/products", data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return { status: response.status, data: response.data };
};