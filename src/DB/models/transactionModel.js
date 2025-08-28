import mongoose from "mongoose";

export const transactionStatus = {
  borrowed: 'borrowed',
  returned: 'returned'
}

const transactionSchema = mongoose.Schema({
  bookId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref:'book'
  },
  userId:{
    type: mongoose.Types.ObjectId,
    ref: 'user',
    required: true
  },
  borrowDate:{
    type: Date,
    required: true,
    default: Date.now
  },
  returnDate:{
    type: Date
  },
  status:{
    type: String,
    required: true,
    enum: Object.values(transactionStatus)

  }
})

const transactionModel = mongoose.models.transaction || mongoose.model('transaction', transactionSchema)

export default transactionModel