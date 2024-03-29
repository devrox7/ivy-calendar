//Validation
const Joi = require('@hapi/joi');

//Register validation
const registerValidation = data => {
    const schema = Joi.object({
        firstName: Joi.string()
            .min(3)
            .max(255)
            .required(),

        lastName: Joi.string()
            .min(3)
            .max(255)
            .required(),

        email: Joi.string()
            .min(1)
            .max(255)
            .required()
            .email(),

        password: Joi.string()
            .min(6)
            .required()
    })

    return schema.validate(data);
}

//Login validation
const loginValidation = data => {
    const schema = Joi.object({

        email: Joi.string()
            .min(1)
            .max(255)
            .required()
            .email(),

        password: Joi.string()
            .min(6)
            .required()
    })

    return schema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;