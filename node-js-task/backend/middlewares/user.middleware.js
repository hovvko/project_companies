const {userValidator} = require('../validators');

module.exports = {
    isDataOnCreateUserValid: (req, res, next) => {
        try {
            const {error, value} = userValidator.onCreate.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }
}