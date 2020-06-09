const Joi = require('@hapi/joi');

const schema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string()
    .trim()
    .min(8)
    .max(20)
    .required(),
});

module.exports = schema;
