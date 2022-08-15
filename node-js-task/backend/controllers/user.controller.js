const {userService} = require('../services');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await userService.getAll();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const {name, color} = req.body;

            const newUser = await userService.createUser(name, color);

            res.json(newUser);
        } catch (e) {
            next(e);
        }
    }
}