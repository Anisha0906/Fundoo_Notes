import express from 'express';
import * as userController from '../controllers/user.controller';
import {  NewUserValidator} from '../validators/user.validator';


const router = express.Router();

//route to register a new user
router.post('/Register', NewUserValidator, userController.RegisterNewUser);

//route to login user
router.post('/login',userController.login);

export default router;
