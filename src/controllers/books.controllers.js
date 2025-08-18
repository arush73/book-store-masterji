import { Book } from '../models/books.models.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'

const addBook = asyncHandler(async (req, res) => {
  const { title } = req.body

  if (!title) throw new ApiError(400, 'provide the book title in the body')

  const createDatabase = await Book.create({
    title: title,
    addedBy: req.user._id,
  })
  if (!createDatabase)
    throw new ApiError(500, 'Failed to add book to the database')

  return res
    .status(201)
    .json(new ApiResponse(201, 'Book added successfully', createDatabase))
})

const getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({ addedBy: req.user._id }).sort({
    createdAt: -1,
  })

  if (!books || books.length === 0)
    throw new ApiError(404, 'No books found for this user')

  return res
    .status(200)
    .json(new ApiResponse(200, 'Books retrieved successfully', books))
})

const getBookDetails = asyncHandler(async (req, res) => {
  const bookId = req.params.id

  if (!bookId) throw new ApiError(400, 'Book ID is required')

  const book = await Book.findOne({ _id: bookId, addedBy: req.user._id })

  if (!book) throw new ApiError(404, 'Book not found')

  return res
    .status(200)
    .json(new ApiResponse(200, 'Book details retrieved successfully', book))
})

const updateBook = asyncHandler(async (req, res) => {
  const bookId = req.params.id
  const { title } = req.body

  if (!bookId) throw new ApiError(400, 'Book ID is required')
  if (!title) throw new ApiError(400, 'Book title is required')

  const updatedBook = await Book.findOneAndUpdate(
    { _id: bookId, addedBy: req.user._id },
    { title: title },
    { new: true }
  )

  if (!updatedBook) throw new ApiError(404, 'Book not found or not updated')

  return res
    .status(200)
    .json(new ApiResponse(200, 'Book updated successfully', updatedBook))
})

const deleteBook = asyncHandler(async (req, res) => {
  const bookId = req.params.id

  if (!bookId) throw new ApiError(400, 'Book ID is required')

  const deletedBook = await Book.findOneAndDelete({
    _id: bookId,
    addedBy: req.user._id,
  })

  if (!deletedBook) throw new ApiError(404, 'Book not found or not deleted')
  return res
    .status(200)
    .json(new ApiResponse(200, 'Book deleted successfully', deletedBook))
})

export default {
  addBook,
  getAllBooks,
  getBookDetails,
  updateBook,
  deleteBook,
}
