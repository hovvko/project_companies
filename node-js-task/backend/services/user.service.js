const {User, Color} = require('../database');

module.exports = {
    getAll: async () => {
        return User.find().populate('colorID');
    },

    createUser: async (name, color) => {
        const {_id} = await Color.findOne({name: color});

        return (await User.create({name, colorID: _id})).populate('colorID');
    }
};