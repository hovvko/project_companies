const {enums} = require('../enums');
const {userValidator, queryValidator} = require('../validators');
const {customError} = require('../errors');
const {userDatabaseService, tokenService} = require('../services');
const {comparePassword} = require('../services/password.service');
const {configs} = require('../configs');
const {Auth} = require('../database');

module.exports = {
    isUserIdValid: (status = 400) => (req, res, next) => {
        try {
            const {id} = req.body;

            if (!id) {
                return next(new customError('Field id is required'));
            }

            const isEmail = id.includes('@');
            if (isEmail) {
                const {error, value} = userValidator.onEmail.validate(id);

                if (error) {
                    return next(new customError(error.details[0].message, status));
                }

                req.body.id = value;
                req.idType = enums.EMAIL;
                next();
                return;
            }

            const {error, value} = userValidator.onPhone.validate(id);

            if (error) {
                return next(new customError(error.details[0].message));
            }

            req.body.id = value;
            req.idType = enums.PHONE;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPasswordValid: (status = 400) => (req, res, next) => {
        try {
            const {error, value} = userValidator.onPassword.validate(req.body.password);

            if (error) {
                return next(new customError(error.details[0].message, status));
            }

            req.body.password = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserUnique: async (req, res, next) => {
        try {
            const {id} = req.body;

            if (req.idType === enums.EMAIL) {
                const userByEmail = await userDatabaseService.getOneUser({id});

                if (userByEmail) {
                    return next(new customError('User with such id is exist'));
                }

                next();
            }

            if (req.idType === enums.PHONE) {
                const userByPhone = await userDatabaseService.getOneUser({id});

                if (userByPhone) {
                    return next(new customError('User with such id is exist'));
                }

                next();
            }
        } catch (e) {
            next(e);
        }
    },

    isUserExist: async (req, res, next) => {
        try {
            const {id} = req.body;

            if (req.idType === enums.EMAIL) {
                const userByEmail = await userDatabaseService.getOneUser({id});

                if (!userByEmail) {
                    return next(new customError('Wrong id or password', 401));
                }

                req.user = userByEmail;
                next();
            }

            if (req.idType === enums.PHONE) {
                const userByPhone = await userDatabaseService.getOneUser({id});

                if (!userByPhone) {
                    return next(new customError('Wrong id or password', 401));
                }

                req.user = userByPhone;
                next();
            }
        } catch
            (e) {
            next(e);
        }
    },

    checkPassword: async (req, res, next) => {
        try {
            const {password} = req.body;
            const {password: hashedPassword} = req.user;

            const isPasswordSame = await comparePassword(password, hashedPassword);

            if (!isPasswordSame) {
                return next(new customError('Wrong id or password', 401));
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get('Authorization');

            if (!access_token) {
                return next(new customError('No token', 401));
            }

            tokenService.checkToken(access_token, configs.ACCESS_SECRET);

            const tokenInfo = await Auth.findOne({access_token}).populate('userID');

            if (!tokenInfo) {
                return next(new customError('Token not valid', 401));
            }

            req.user = tokenInfo['userID'];
            req.access_token = access_token;
            next();
        } catch (e) {
            next(e);
        }
    },

    isLogoutQueryAllValid: (req, res, next) => {
        try {
            const {all} = req.query;

            const {error, value} = queryValidator.onLogoutAll.validate(all);

            if (error) {
                return next(new customError(error.details[0].message));
            }

            req.query.all = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get('Authorization');

            if (!refresh_token) {
                return next(new customError('No token', 401));
            }

            tokenService.checkToken(refresh_token, configs.REFRESH_SECRET);

            const tokenInfo = await Auth.findOne({refresh_token});

            if (!tokenInfo) {
                return next(new customError('Token not valid', 401));
            }

            req.tokenInfo = tokenInfo;
            next();
        } catch (e) {
            next(e);
        }
    }
}