import Joi from "joi"

export const addBookSchema = ({
  body: Joi.object({
    title: Joi.string().min(5).max(50).required(),
    author: Joi.string().min(3).max(20).required(),
    publishedYear: Joi.number().integer().min(1000).max(new Date().getFullYear()).required(),
    availableCopies: Joi.number().min(0).required()
  })
})

export const updateBookSchema = addBookSchema