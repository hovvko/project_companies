const {userDatabaseService} = require('../services');
const {userPresenter} = require('../presenters');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const allUsersInfo = await userDatabaseService.getAllUsers();

            const users = allUsersInfo.map(user => userPresenter.onUser(user));

            res.json({
                users
            });
        } catch (e) {
            next(e);
        }
    }
}