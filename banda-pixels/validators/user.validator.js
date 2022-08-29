const Joi = require('joi');

const {userRegex} = require('../configs');

module.exports = {
    onEmail: Joi.string().pattern(userRegex.EMAIL_REGEX).trim().lowercase(),
    onPhone: Joi.string().pattern(userRegex.PHONE_REGEX).trim(),
    onPassword: Joi.string().pattern(userRegex.PASSWORD_REGEX).required()
};