import Joi from "joi"
import { Types } from "mongoose"

const validateId = (value,helper)=>{
  const isValid = Types.ObjectId.isValid(value)
  return (isValid ? value : helper.message('ObjectId is not a valid'))
}

const validation = {
  headers:Joi.object({
    token:Joi.string().required(),
    "content-type":Joi.string(),
    "user-agent":Joi.string(),
    "accept":Joi.string(),
    "accept-encoding":Joi.string(),
    "accept-language":Joi.string(),
    "postman-token":Joi.string(),
    "content-length":Joi.string(),
    "connection":Joi.string(),
    "host":Joi.string(),
  }).options({allowUnknown:true}),
  params:validateId
}

export default validation