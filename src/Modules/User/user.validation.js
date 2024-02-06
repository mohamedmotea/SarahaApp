import Joi from "joi";
import validation from './../../utils/validation.js';

export const accountData = {
  headers:validation.headers
}
export const getAccount = {
  params:Joi.object({
    userId:Joi.custom(validation.params)
  })
}
