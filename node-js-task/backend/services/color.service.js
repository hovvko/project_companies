const {Color} = require('../database');

module.exports = {
    createColor: async (name) => {
        return  Color.create({name});
    }
};