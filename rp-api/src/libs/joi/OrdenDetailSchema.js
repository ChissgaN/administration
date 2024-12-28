import joi from "joi";

export const storeSchema = joi.object({
  order_id: joi.number().required(),
  products_id: joi.number().required(),
  quantity: joi.number().required(),
  price: joi.number().required(),
  subtotal: joi.number().required(),
});

export const updateSchema = joi.object({
  quantity: joi.number().required(),
  subtotal: joi.number().required(),
  total_order: joi.number().required(),
});