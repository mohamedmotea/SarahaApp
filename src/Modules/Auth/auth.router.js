import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import vld from "../../Middlewares/validation.js";
import * as validationSchema from './auth.validation.js'
import * as AC from './auth.controller.js'
import auth from './../../Middlewares/auth.middleware.js';
import multerMiddleware from './../../Middlewares/multer.middleware.js';

const router = Router()

router
.post('/signUp',vld(validationSchema.signUp),expressAsyncHandler(AC.signUp))
.post('/signIn',vld(validationSchema.signIn),expressAsyncHandler(AC.signIn))
.get('/verify/:token',expressAsyncHandler(AC.verify))
.patch('/pfp',multerMiddleware().single('picture'),auth(),vld(validationSchema.profilePicture),expressAsyncHandler(AC.profilePicture))
.put('/',auth(),vld(validationSchema.updateAccount),expressAsyncHandler(AC.updateAccount))
.delete('/',auth(),vld(validationSchema.deleteAccount),expressAsyncHandler(AC.deleteAccount))
export default router