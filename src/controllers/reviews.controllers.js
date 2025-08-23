import { asyncHandler } from '../utils/asyncHandler.js'
import Review from '../models/review.models.js'

const addReview = asyncHandler(async (req, res) => {
  const { bookId } = req.params

  const { rating, content } = req.body

  const review = await Review.create({
    book: bookId,
    user: req.user._id,
    rating,
    comment: content,
  })

  if (!review) throw new ApiError(500, 'failed to create review')

  return res
    .status(201)
    .json(new ApiResponse(201, 'review created successfully', review))
})

const getReviews = asyncHandler(async (req, res) => {
  const { bookId } = req.params

  const reviews = await Review.find({ book: bookId })

  if (!reviews || reviews.length === 0) {
    return res.status(404).json(new ApiResponse(404, 'no reviews found'))
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'reviews retrieved successfully', reviews))
})

const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params

  const review = await Review.findByIdAndDelete(id)

  if (!review) {
    return res.status(404).json(new ApiResponse(404, 'review not found'))
  }

  return res
    .status(200)
    .json(new ApiResponse(200, 'review deleted successfully', review))
})

export { addReview, getReviews, deleteReview }
