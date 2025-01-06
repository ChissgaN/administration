import joi from "joi";

export const storeSchema = joi.object({
  role_id: joi.number().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  phone_number: joi.string().required(),
  birth_date: joi.string().required(),
  social_reason: joi.when("role_id", {
    is: 2,
    then: joi.string().required(),
    otherwise: joi.forbidden(),
  }),
  comertial_name: joi.when("role_id", {
    is: 2,
    then: joi.string().required(),
    otherwise: joi.forbidden(),
  }),
  delivery_address: joi.when("role_id", {
    is: 2,
    then: joi.string().required(),
    otherwise: joi.forbidden(),
  }),
});

export const updateSchema = joi.object({
  role_id: joi.number().required(),
  email: joi.string().email().required(),
  phone_number: joi.string().required(),
  birth_date: joi.string().required(),
  social_reason: joi.when("role_id", {
    is: 2,
    then: joi.string().required(),
    otherwise: joi.forbidden(),
  }),
  comertial_name: joi.when("role_id", {
    is: 2,
    then: joi.string().required(),
    otherwise: joi.forbidden(),
  }),
  delivery_address: joi.when("role_id", {
    is: 2,
    then: joi.string().required(),
    otherwise: joi.forbidden(),
  }),
});
