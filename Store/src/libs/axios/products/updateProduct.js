import instance from "..";

export const updateProduct = async (id, product) => {
  const { status, data } = await instance.put(`/products/${id}`, product, 
    {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    }
  );
  return { status, data };
};
