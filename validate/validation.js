const Joi = require('@hapi/joi')

const registerValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });
        return schema.validate(data);
};

const logInValidation = data => {
    const schema = Joi.object({
        username: Joi.string().min(6).required(),
        password: Joi.string().min(6).required()
    });
        return schema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.logInValidation = logInValidation;