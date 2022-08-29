const authRouter = require('express').Router();

const {authController} = require('../controllers');
const {authMiddleware} = require('../middlewares');

authRouter.post('/signup',
    authMiddleware.isUserIdValid(),
    authMiddleware.isUserPasswordValid(),
    authMiddleware.isUserUnique,
    authController.signup
);

authRouter.post('/signin',
    authMiddleware.isUserIdValid(401),
    authMiddleware.isUserPasswordValid(401),
    authMiddleware.isUserExist,
    authMiddleware.checkPassword,
    authController.signIn
);

authRouter.post('/logout',
    authMiddleware.isLogoutQueryAllValid,
    authMiddleware.checkAccessToken,
    authController.logout
);

authRouter.post('/refresh',
    authMiddleware.checkRefreshToken,
    authController.refresh
);

module.exports = authRouter;