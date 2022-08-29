const Joi = require('joi');

const {enums} = require('../enums');

module.exports = {
    onLogoutAll: Joi.string().valid(enums.TRUE, enums.FALSE)
};