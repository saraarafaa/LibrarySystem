import bookModel from "../../DB/models/bookModel.js"
import transactionModel, { transactionStatus } from "../../DB/models/transactionModel.js"
import { userRole } from "../../DB/models/userModel.js"

//---------------------- Borrow a book ----------------------
export const borrowBook = async(req, res, next) =>{
  const{userId, bookId} = req.body

  const book = await bookModel.findById(bookId)
  if(!book) throw new Error("No Book Found", {cause: 404});

  if(book.availableCopies <= 0) throw new Error("No Available Copies", {cause: 400});

  const transaction = await transactionModel.create({
    userId,
    bookId,
    status: transactionStatus.borrowed
  })

  book.availableCopies -= 1
  await book.save()

  return res.status(201).json({message: 'Book Borrowed Successfully', transaction})

}

//---------------------- Return a book ----------------------
export const returnBook = async(req, res, next) =>{
  const {id} = req.params

  const transaction = await transactionModel.findById(id)
  if(!transaction) throw new Error("No Transaction found", {cause: 404});

  if(transaction.userId.toString() !== req.user._id.toString() && req.user.role !== userRole.admin)
    throw new Error("You are not allowed to return this book", {cause: 403});
    
  if(transaction.status == transactionStatus.returned)
    throw new Error("Book already returned", {cause: 400});
    
  const returnProcess = await transactionModel.findByIdAndUpdate(id, {
    status: transactionStatus.returned,
    returnDate: Date.now()
  }, {new: true})

  await bookModel.findByIdAndUpdate(transaction.bookId, {$inc: {availableCopies: 1}})

  return res.status(201).json({message: 'Book returned Successfully', returnProcess})
  
}

//---------------------- List books ----------------------
export const listBooks = async(req, res, next) =>{
  const transactions = await transactionModel.find({userId: req.user._id}).populate("bookId")

  return res.status(200).json({message: 'Transactions returned Successfully', transactions})

}

//---------------------- List transactions ----------------------
export const getTransactions = async(req, res, next) =>{
  const transactions = await transactionModel.find()
  if(transactions.length == 0)
    throw new Error("No Transaction Found", {cause: 404});

  const sortedTransactions = await transactionModel.find().sort(transactions.borrowDate)
  return res.status(200).json({message: 'Transactions returned Successfully', transactions})

}

