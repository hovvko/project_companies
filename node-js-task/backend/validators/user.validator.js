const Joi = require('joi');

const {colorsEnum} = require('../configs');

module.exports = {
    onCreate: Joi.object({
        name: Joi.string().min(2).max(20).trim().required(),
        color: Joi.string().trim().lowercase().valid(...colorsEnum.colors).required()
    })
};