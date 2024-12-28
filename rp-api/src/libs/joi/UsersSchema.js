import joi from "joi";

export const storeSchema = joi.object({
  role_id: joi.number().required(),
  status_id: joi.number().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  phone_number: joi.string().required(),
  birth_date: joi.string().required(),
});

export const updateSchema = joi.object({
    role_id: joi.number().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    phone_number: joi.string().required(),
    birth_date: joi.string().required(),
});