import joi from "joi";

export const storeSchema = joi.object({
  name: joi.string().required(),
});

export const updateSchema = joi.object({
  name: joi.string().required(),
});