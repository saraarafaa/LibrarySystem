import { Router } from "express";
import * as US from "./user.service.js";
import * as UV from "./user.validator.js";
import { validation } from "../../middleware/validation.js";
import { authentication } from "../../middleware/authentication.js";
import { rateLimiter } from "../../middleware/rateLimiter.js";

export const userRouter = Router()

userRouter.post('/register', validation(UV.registerSchema), US.register)
userRouter.post('/login', validation(UV.loginSchema), rateLimiter, US.login)
userRouter.get('/profile', authentication, validation(UV.profile), US.getProfile)
userRouter.get('/confirmEmail/:token', US.confirmEmail)