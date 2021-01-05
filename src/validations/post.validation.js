const { Joi } = require('express-validation');

module.exports = {
  createPostValidation: {
    body: Joi.object({
      title: Joi.string()
        .required(),
      description: Joi.string()
        .required(),
      body: Joi.string()
        .required(),
    }),
  },
  updatePostValidation: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
    body: Joi.object({
      title: Joi.string(),
      description: Joi.string(),
      body: Joi.string(),
    }),
  },
  removePostValidation: {
    params: Joi.object({
      id: Joi.string().required(),
    }),
  },
};
