import Joi from "joi";
import { generalRules } from "../../utils/generalRules/generalRules.js";

export const borrowBookSchema = ({
  body: Joi.object({
    userId: generalRules.id.required(),
    bookId: generalRules.id.required(),
  })
})