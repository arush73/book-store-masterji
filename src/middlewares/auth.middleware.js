import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'

const verifyToken = (req, _, next) => {
  const token = req.cookies.accessToken
  if (!token)
    throw new ApiError(401, 'Invalid token or token not found in cookies')

  const verify = jwt.verify(token, process.env.JWT_SECRET)
  if (!verify)
    throw new ApiError(401, 'Invalid token or token not found in cookies')

  req.user = verify
  next()
}

const checkAdmin = (req, _, next) => {
  if (req.user.role !== 'admin')
    throw new ApiError(403, 'You are not authorized to perform this action')

  next()
}
export { verifyToken }
