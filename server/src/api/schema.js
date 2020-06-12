const Joi = require('@hapi/joi');

const querySchema = Joi.string()
  .trim()
  .min(1)
  .max(50)
  .required();

const reviewSchema = Joi.object({
  mediaType: Joi.string()
    .pattern(/^(track)|(artist)|(album)$/)
    .required(),

  mediaName: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .required(),

  mediaCreator: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .required(),

  content: Joi.string()
    .trim()
    .min(1)
    .max(1000)
    .required(),
});

module.exports = { querySchema, reviewSchema };
