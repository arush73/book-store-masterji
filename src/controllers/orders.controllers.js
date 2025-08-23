import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import Order from '../models/order.models.js'

const placeOrder = asyncHandler(async (req, res) => {
  const { books, totalAmount } = req.body
  if (!books || books.length === 0 || !totalAmount)
    throw new ApiError(400, 'please provide books and total amount')

    const order = await Order.create({
        user: req.user._id,
        books: books.map(book => ({
            book: book.bookId,
            quantity: book.quantity,
        })), totalAmount,
        status: 'pending',
    })

    if (!order) throw new ApiError(500, 'failed to place order')
    
    return res
        .status(201)
        .json(new ApiResponse(201, 'order placed successfully', order))
})

const getOrders = asyncHandler(async (req, res) => {})

const getOrderDetails = asyncHandler(async (req, res) => {})

export { placeOrder, getOrders, getOrderDetails }
