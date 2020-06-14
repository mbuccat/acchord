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

export const userSchema = Joi.object({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
  
    password: Joi.string()
      .trim()
      .min(8)
      .max(20)
      .pattern(/^[\S]*$/)
      .required(),
  });