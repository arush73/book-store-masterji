import { Router } from 'express'

const router = Router()

import {
  registerUser,
  loginUser,
  getApiKey,
  getUser,
} from '../controllers/auth.controller.js'

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/api-key').post(getApiKey)
router.route('/me').get(getUser)

export default router
