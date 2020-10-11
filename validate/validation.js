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

const profileValidate = data =>{
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        systemId: Joi.string().min(1).required()
    });
    return schema.validate(data);
};

const requestRoomValidation = data =>{
    const schema = Joi.object({
        userId: Joi.string().min(1).required(),
        roomId: Joi.string().min(1).required(),
        isAccept: Joi.bool().required()
    });
    return schema.validate(data);
};

const userRoomValidation = data =>{
    const schema = Joi.object({
        userId: Joi.string().min(1).required(),
        roomId: Joi.string().min(1).required(),
        isOwner: Joi.bool().required()
    })
    return schema.validate(data);
}

module.exports.userRoomValidation = userRoomValidation;
module.exports.registerValidation = registerValidation;
module.exports.logInValidation = logInValidation;
module.exports.sharedRoomValidation = sharedRoomValidation;
module.exports.profileValidate = profileValidate;
module.exports.requestRoomValidation = requestRoomValidation;
