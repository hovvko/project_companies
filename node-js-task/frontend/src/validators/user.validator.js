import Joi from 'joi';

import {colorsEnum} from '../configs';

const userValidator = Joi.object({
    name: Joi.string().min(2).max(20).trim().required(),
    color: Joi.string().trim().lowercase().valid(...colorsEnum.colors).required()
});

export {
    userValidator
};