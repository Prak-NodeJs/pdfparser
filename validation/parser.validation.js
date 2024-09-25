const Joi = require('joi')

const validateRequest= {
  body: Joi.object()
    .keys({
        webUrl: Joi.string()
        .uri({ scheme: ['https', 'http'] })
        .required()
        .messages({
          'string.uri': 'The webUrl must be a valid HTTPS URL',
          'any.required': 'The webUrl is required',
        }),
    }),
};

module.exports = {
    validateRequest
}