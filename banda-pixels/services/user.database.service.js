const {User} = require('../database');

module.exports = {
    getAllUsers: (filter = {}) => {
        return User.find(filter);
    },

    getOneUser: (filter = {}) => {
        return User.findOne(filter);
    },

    createUser: (user) => {
        return User.createUserWithHashPassword(user);
    }
};