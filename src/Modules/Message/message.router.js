import { Router } from "express";
import expressAsyncHandler from "express-async-handler";
import * as MC from './message.controller.js'
import * as validationSchema from './message.validation.js'
import vld from './../../Middlewares/validation.js';
import auth from "../../Middlewares/auth.middleware.js";


const router = Router();

router
.post('/:sendTo',vld(validationSchema.sendMessage),expressAsyncHandler(MC.sendMessage))
.delete('/:msgId',auth(),vld(validationSchema.deleteMessage),expressAsyncHandler(MC.deleteMessage))
export default router