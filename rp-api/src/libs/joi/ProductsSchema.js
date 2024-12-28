import joi from "joi";

export const storeSchema = joi.object({}).keys({
  products_categories_id: joi.number().required(),
  name: joi.string().required(),
  brand: joi.string().required(),
  code: joi.string().required(),
  stock: joi.number().required(),
  status_id: joi.number().required(),
  price: joi.number().required()
});

export const updateSchema = joi.object({}).keys({
  products_categories_id: joi.number(),
  name: joi.string(),
  brand: joi.string(),
  code: joi.string(),
});


export default { storeSchema, updateSchema };