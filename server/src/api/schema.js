const Joi = require('@hapi/joi');

const querySchema = Joi.string().trim().min(1).max(50).required();

module.exports = { querySchema };
