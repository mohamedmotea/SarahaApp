import { Router } from "express";
import expressAsyncHandler from 'express-async-handler'
import * as UC from "./user.controller.js";
import * as validationSchema from "./user.validation.js";
import vld from "../../Middlewares/validation.js";
import auth from '../../Middlewares/auth.middleware.js';



const router = Router()

router
.get('/messages',auth(),vld(validationSchema.accountData),expressAsyncHandler(UC.getAllMessage))
.get('/veiwed',auth(),vld(validationSchema.getAccount),expressAsyncHandler(UC.getMessageIsVeiwed))
.get('/',auth(),vld(validationSchema.accountData),expressAsyncHandler(UC.accountData))
.get('/:userId',vld(validationSchema.getAccount),expressAsyncHandler(UC.getAccount))

export default router