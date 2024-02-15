import Joi from "joi";
import validation from './../../utils/validation.js';


export const sendMessage = {
  body: Joi.object({
    content:Joi.string().required().min(3).max(299),
  }),
  params:Joi.object({
    sendTo:Joi.custom(validation.params)
  })
}

export const deleteMessage = {
  params:Joi.object({
    msgId:Joi.custom(validation.params)
  }),
  headers:validation.headers
}