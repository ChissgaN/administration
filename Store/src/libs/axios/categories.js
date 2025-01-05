import instance from ".";

export const getAllCategories = async () => {
  const { data, status } = await instance.get("/categories");
  return { data, status };
};

export const createCategory = async (category) => {
  const { data, status } = await instance.post("/categories", category);
  return { data, status };
};

export const updateCategory = async (id, category) => {
  const { data, status } = await instance.put(`/categories/${id}`, category);
  return { data, status };
};

export const deleteCategory = async (id) => {
  const { data, status } = await instance.delete(`/categories/${id}`);
  return { data, status };
};


export default {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
}