const userRouter = require('express').Router();

const {userController} = require('../controllers');

userRouter.get('/info',
    userController.getAll
);

module.exports = userRouter;