import express from 'express';
import * as userController from '../controllers/user.controller';
import {NewUserValidator} from '../validators/user.validator';
import  {userresetAuth}  from '../middlewares/auth.middleware';


const router = express.Router();

//route to register a new user
router.post('/Register', NewUserValidator, userController.RegisterNewUser);

//route to login user
router.post('/login',userController.login);

//route for forget password
router.post('/ForgetPWD', userController.forgetPassword);

//route for reset password
router.put('/ResetPWD', userresetAuth, userController.NewPassword);


export default router;
