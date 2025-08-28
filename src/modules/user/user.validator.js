import Joi from "joi";
import { generalRules } from "../../utils/generalRules/generalRules.js";
import { userRole } from "../../DB/models/userModel.js";

export const registerSchema = {
  body: Joi.object({
    email: generalRules.email,
    password: generalRules.password,
    cPassword: Joi.string().valid(Joi.ref('password')).required(),
    name: Joi.string().alphanum().max(20).min(3).required(),
    role: Joi.string().valid(userRole.admin, userRole.member).required()
  })
}

export const loginSchema = {
  body: Joi.object({
    email: generalRules.email,
    password: generalRules.password,
  })
}

export const profile = loginSchema