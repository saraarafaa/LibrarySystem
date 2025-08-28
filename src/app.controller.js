import { checkConnectionDB } from "./DB/connectionDB.js"
import { globalErrorHandling } from "./middleware/globalErrorHandling.js"
import { bookRouter } from "./modules/books/book.controller.js"
import transactionRouter from "./modules/transactions/transaction.controller.js"
import { userRouter } from "./modules/user/user.controller.js"

const bootstrap = (app, express) =>{
  checkConnectionDB()
  app.use(express.json())
  app.use('/users', userRouter)
  app.use('/books', bookRouter)
  app.use('/transactions', transactionRouter)

  app.use('/', (req, res, next) =>{
    return res.status(200).json({message: 'Welcome to LibrarySystem App'})
  })


  app.use('{/*demo}', (req, res, next) =>{
    throw new Error(`URL Not Found ${req.originalUrl}`);
    
  })

  app.use(globalErrorHandling)
}

export default bootstrap