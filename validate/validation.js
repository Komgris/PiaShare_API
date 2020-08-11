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

const sharedRoomValidation = data =>{
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        budget: Joi.number().min(1).integer().required(),
        member: Joi.number().min(1).integer().required(),
        peroid: Joi.number().min(1).integer().required(),
        start: Joi.date().iso().required(),
        finish: Joi.date().iso().required(),
        owner: Joi.string().min(1).required()
    });
    return schema.validate(data);
};
module.exports.registerValidation = registerValidation;
module.exports.logInValidation = logInValidation;
module.exports.sharedRoomValidation = sharedRoomValidation;