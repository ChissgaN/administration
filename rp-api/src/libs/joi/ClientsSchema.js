import joi from "joi";

export const storeSchema = joi.object({
  social_reason: joi.string().required(),
  comertial_name: joi.string().required(),
  delivery_address: joi.string().required(),
  phone_number: joi.string().required(),
  email: joi.string().email().required(),
});

export const updateSchema = joi.object({
    social_reason: joi.string().required(),
    comertial_name: joi.string().required(),
    delivery_address: joi.string().required(),
    phone_number: joi.string().required(),
    email: joi.string().email().required(),
});