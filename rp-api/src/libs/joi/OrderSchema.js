import joi from "joi";

export const storeSchema = joi.object({
  status_id: joi.number().required(),
  full_name: joi.string().max(45).required(),
  address: joi.string().max(245).required(),
  phone_number: joi.string().max(45).required(),
  email: joi.string().email().required(),
  delivery_date: joi.date().required(),
  total_order: joi.number().required(),
  order_details: joi.array().required(),
});

export const updateSchema = joi.object({
  full_name: joi.string().max(45).required(),
  address: joi.string().max(245).required(),
  phone_number: joi.string().max(45).required(),
  email: joi.string().email().required(),
}); 