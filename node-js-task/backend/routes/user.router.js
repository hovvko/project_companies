const userRouter = require('express').Router();

const {userController} = require('../controllers');
const {userMiddleware} = require('../middlewares');

userRouter.get('/',
    userController.getAll
);

userRouter.post('/',
    userMiddleware.isDataOnCreateUserValid,
    userController.create
);

module.exports = userRouter;