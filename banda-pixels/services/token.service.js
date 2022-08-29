const jwt = require('jsonwebtoken');

const {customError} = require('../errors');
const {configs} = require('../configs');

module.exports = {
    generateAuthTokens: (payload = {}) => {
        const access_token = jwt.sign(payload, configs.ACCESS_SECRET, {expiresIn: '10m'});
        const refresh_token = jwt.sign(payload, configs.REFRESH_SECRET, {expiresIn: '10d'});

        return {
            access_token,
            refresh_token
        };
    },

    checkToken: (token, secretWord) => {
        try {
            return jwt.verify(token, secretWord);
        } catch (e) {
            throw new customError('Token not valid', 401);
        }
    },
};