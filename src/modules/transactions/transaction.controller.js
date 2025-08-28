import * as TV from "./transaction.validator.js";
import * as TS from "./transaction.service.js";
import { Router } from "express";
import { authentication } from "../../middleware/authentication.js";
import { validation } from "../../middleware/validation.js";
import { authorization } from "../../middleware/authorization.js";
import { userRole } from "../../DB/models/userModel.js";

const transactionRouter = Router()

transactionRouter.post('/borrow',authentication, validation(TV.borrowBookSchema), TS.borrowBook)
transactionRouter.put('/return/:id',authentication, TS.returnBook)
transactionRouter.get('/user',authentication, TS.listBooks)
transactionRouter.get('/all',authentication, authorization(userRole.admin), TS.getTransactions)


export default transactionRouter