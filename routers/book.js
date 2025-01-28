const verifyAdmin = require('../utils/verifyAdmin');
const verifyToken = require('../utils/verifyToken');
const bookCotrollers=require('../controllers/book')
const bookRouter=require('express').Router()

bookRouter.get("/", verifyToken,bookCotrollers.getAllBooks);
bookRouter.post("/", verifyAdmin,bookCotrollers.addNewBook);
bookRouter.get("/:id", verifyToken,bookCotrollers.getSingleBook );
bookRouter.put("/:id", verifyAdmin,bookCotrollers.updateBook );
bookRouter.delete("/:id", verifyAdmin,bookCotrollers.deleteBook);

module.exports=bookRouter