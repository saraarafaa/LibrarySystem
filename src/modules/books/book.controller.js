import { Router } from "express";
import * as BS from "./book.service.js";
import * as BV from "./book.validator.js";
import { authentication } from "../../middleware/authentication.js";
import { validation } from "../../middleware/validation.js";
import { authorization } from "../../middleware/authorization.js";
import { userRole } from "../../DB/models/userModel.js";

export const bookRouter = Router()

bookRouter.post('/',authentication, authorization(userRole.admin), validation(BV.addBookSchema), BS.addBook)
bookRouter.get('/',authentication, BS.getAllBooks)
bookRouter.get('/search',authentication, BS.bookSearch)
bookRouter.put('/:id',authentication, authorization(userRole.admin), validation(BV.updateBookSchema), BS.updateBook)
bookRouter.delete('/:id',authentication, authorization(userRole.admin), BS.deleteBook)