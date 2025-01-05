import instance from ".";

export const createNewProduct = async (data) => {
  const response = await instance.post("/products", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return { status: response.status, data: response.data };
};

export const deleteProduct = async (id) => {
  const { data, status } = await instance.delete(`/products/${id}`);
  return { data, status };
};

export const getAllProducts = async () => {
  const { data } = await instance.get("/products");
  return data;
};

export const updateProduct = async (id, product) => {
  const { status, data } = await instance.put(`/products/${id}`, product, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return { status, data };
};

export default {
    createNewProduct,
    deleteProduct,
    getAllProducts,
    updateProduct,
}