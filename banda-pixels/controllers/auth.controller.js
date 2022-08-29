const {authDatabaseService, userDatabaseService, tokenService} = require('../services');
const {enums} = require('../enums');
const {Auth} = require('../database');

module.exports = {
    signup: async (req, res, next) => {
        try {
            await userDatabaseService.createUser({
                ...req.body,
                idType: req.idType
            });

            res.status(201).json('User was created');
        } catch (e) {
            next(e);
        }
    },

    signIn: async (req, res, next) => {
        try {
            const {_id, id, idType, createdAt, updatedAt} = req.user;
            const tokens = tokenService.generateAuthTokens();

            await authDatabaseService.createTokens({
                userID: _id,
                ...tokens
            });

            res.json({
                tokens,
                user: {
                    _id,
                    id,
                    idType,
                    createdAt,
                    updatedAt
                }
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {all} = req.query;
            const {_id} = req.user;
            const access_token = req.access_token;

            if (!all || all === enums.FALSE) {
                await authDatabaseService.deleteOneToken({access_token})
            }

            if (all === enums.TRUE) {
                await authDatabaseService.deleteManyTokens({userID: _id});
            }

            res.json('User was logout');
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const {userID, refresh_token} = req.tokenInfo;

            await Auth.deleteOne({refresh_token});

            const tokens = tokenService.generateAuthTokens();

            await Auth.create({
                userID,
                ...tokens
            });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};