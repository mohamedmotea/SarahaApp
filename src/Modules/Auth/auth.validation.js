import Joi from "joi";
import validation from "../../utils/validation.js";


export const signUp = {
  body: Joi.object({
    userName:Joi.string().min(2).required().min(3).max(99),
    email:Joi.string().email().required(),
    password:Joi.string().min(3).required().min(3).max(99),
    gender:Joi.string().valid('male','female','ذكر','انثي'),
  })
}

export const signIn = {
  body: Joi.object({
    email:Joi.string().email().required(),
    password:Joi.string().min(3).required(),
  })
}

export const profilePicture = {
  file:Joi.object({
    fieldname:Joi.string().required(),
    originalname:Joi.string().required(),
    encoding:Joi.string().required(),
    mimetype:Joi.string().required(),
    size:Joi.number().required(),
    path:Joi.string().required(),
    filename:Joi.string().required(),
    destination:Joi.string().required(),
  }).required(),
  headers:validation.headers
}

export const updateAccount = {
  body: Joi.object({
    userName:Joi.string().min(2).required().min(3).max(99),
    email:Joi.string().email().required(),
    newPassword:Joi.string().min(3).required().min(3).max(99),
    gender:Joi.string().valid('male','female','ذكر','انثي'),
  }),
  headers:validation.headers
}

export const deleteAccount = {
  headers:validation.headers
}