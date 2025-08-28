import Joi from "joi";
import { Types } from "mongoose";

const customId = (value, helper) =>{
  const data = Types.ObjectId.isValid(value)
  return data ? value : helper
}

export const generalRules = {
  email: Joi.string().email({tlds: {allow: ['com', 'org']}}).required(),
  password: Joi.string().required(),
  id: Joi.string().custom(customId).required()
}