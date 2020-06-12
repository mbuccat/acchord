const Joi = require('@hapi/joi');

export const querySchema = Joi.string()
  .trim()
  .min(1)
  .max(50)
  .required();

export const contentSchema = Joi.string()
  .trim()
  .min(1)
  .max(1000)
  .required();
