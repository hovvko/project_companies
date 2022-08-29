const {Auth} = require('../database');

module.exports = {
    createTokens: (data = {}) => {
        return Auth.create(data);
    },

    deleteOneToken: (filter = {}) => {
        return Auth.deleteOne(filter);
    },

    deleteManyTokens: (filter = {}) => {
        return Auth.deleteMany(filter);
    }
};