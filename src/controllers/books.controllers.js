import{ asyncHandler } from '../utils/asyncHandler.js'

export const addBook = asyncHandler(async (req, res) => { })

export const getAllBooks = asyncHandler(async (req, res) => { })

export const getBookDetails = asyncHandler(async (req, res) => { })

export const updateBook = asyncHandler(async (req, res) => { })

export const deleteBook = asyncHandler(async (req, res) => { })

export default {
  addBook,
  getAllBooks,
  getBookDetails,
  updateBook,
  deleteBook
}