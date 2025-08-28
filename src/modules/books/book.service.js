import bookModel from "../../DB/models/bookModel.js"

//----------------------------ADD NEW BOOK---------------------------
export const addBook = async(req, res, next) =>{
  const {title, author, publishedYear, availableCopies} = req.body
  const book = await bookModel.create({title, author, publishedYear, availableCopies})

  return res.status(201).json({message: 'Book Added Successfully', book})

}

//----------------------------GET ALL BOOKS---------------------------
export const getAllBooks = async(req, res, next) =>{
  const {sort} = req.query

  const books = await bookModel.find().sort(sort)
  return res.status(200).json({message: 'Books fetched successfully', books})

}

//----------------------------UPDATE BOOK---------------------------
export const updateBook = async(req, res, next) =>{
  const {id} = req.params
  const {title, author, publishedYear, availableCopies} = req.body

  const book = await bookModel.findById(id)
  if(!book)
    throw new Error("BOOK NOT FOUND", {cause: 404});

  const updatedBook = await bookModel.findByIdAndUpdate(id, {title, author, publishedYear, availableCopies}, {new: true})
  return res.status(200).json({message: 'Book Updated Successfully', updatedBook})
    
}

//----------------------------DELETE BOOK---------------------------
export const deleteBook = async(req, res, next) =>{
  const {id} = req.params

  const book = await bookModel.findById(id)
  if(!book)
    throw new Error("BOOK NOT FOUND", {cause: 404});

  const deletedBook = await bookModel.findByIdAndDelete(id)
  return res.status(200).json({message: 'Book deleted Successfully'})
    
}

//----------------------------Search for matched BOOKs---------------------------
export const bookSearch = async(req, res, next) =>{
  const {title, author} = req.query
  const {limit, page} = req.query
  const skip = (page - 1) * limit

   const query = {};
    if (title) {
      query.title = { $regex: title, $options: "i" }; 
    }
    if (author) {
      query.author = { $regex: author, $options: "i" };
    }

  const books = await bookModel.find(query).skip(skip).limit(limit).lean()
  if(books.length == 0)
    throw new Error("NO BOOK FOUND", {cause: 404});
  return res.status(200).json({message: 'Success', books})
    
}