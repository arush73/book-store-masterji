import { Router } from 'express'
import {verifyToken} from "../middlewares/auth.middleware.js"

const router = Router()

import {
  registerUser,
  loginUser,
  getApiKey,
  getUser,
} from '../controllers/auth.controllers.js'

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/api-key').post(getApiKey)
router.route('/me').get(verifyToken,getUser)

export default router
