const authRouter=require('express').Router()
const authControllers=require('../controllers/auth')


authRouter.post("/register",authControllers.register);
authRouter.post("/login",authControllers.login);

module.exports=authRouter