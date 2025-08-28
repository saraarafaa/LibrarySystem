import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true
  },
  author:{
    type: String,
    required: true
  },
  publishedYear:{
    type: Number,
    required: true
  },
  availableCopies:{
    type: Number,
    required: true,
    default: 1
  },
},{
  timestamps: {createdAt: true, updatedAt: false}
})

const bookModel = mongoose.models.book || mongoose.model('book', bookSchema)

export default bookModel