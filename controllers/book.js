const Book=require("../models/book")

async function getAllBooks(req, res,next) {
    try {
        throw(new Error("my error"))
      const books = await Book.find();
      res.json({ status: "success", data: books });
    } catch (error) {
    next(error)
    }
  }
  async function addNewBook(req, res,next) {
    try {
      const newbook = new Book(req.body);
      await newbook.save();
      res.json({ status: "success", data: newbook });
    } catch (error) {
        next(error)

    }
  }
  async function getSingleBook(req, res,next) {
    try {
      const book = await Book.findById(req.params.id);
      res.json({ status: "success", data: book });
    } catch (error) {
        next(error)

    }
  }
async function updateBook(req, res,next) {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      returnDocument: "after",
    });
    res.json({ status: "success", data: book });
  } catch (error) {
    next(error)

  }
}


 async function deleteBook(req, res,next) {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    res.json({ status: "success", data: book });
  } catch (error) {
    next(error)

  }
}

  module.exports={getAllBooks,addNewBook,getSingleBook,updateBook,deleteBook}