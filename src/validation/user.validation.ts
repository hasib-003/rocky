import Joi from 'joi';

export const RegisterValidation = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    password: Joi.string()
        .min(6)
        .pattern(new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*#?&]{6,}$'))
        .required()
        .messages({
            'string.pattern.base': 'Password must contain at least one letter and one number',
        }),
    passwordConf: Joi.ref('password'),
});


export const updatePasswordValidation = Joi.object({
    newpass: Joi.string().min(6).required(),
    passwordConf: Joi.ref('newpass'),
});

export const updateInfoValidation = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
});

