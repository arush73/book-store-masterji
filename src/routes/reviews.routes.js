import { Router } from 'express'

const router = Router()

import {
  addReview,
  getReviews,
  deleteReview,
} from '../controllers/reviews.controller.js'

router.route('/books/:bookId/reviews').post(addReview).get(getReviews) // admin only for post, public for get
router.route('/reviews/:id').delete(deleteReview) // public for get, admin only for put and delete

export default router
