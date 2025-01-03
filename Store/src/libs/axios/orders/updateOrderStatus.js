import instance from "..";

export const updateOrderStatus = async (id, status_id) => {
  const response = await instance.patch(`/order/${id}`, {
    status_id,
  });
  return { data: response.data, status: response.status };
};
