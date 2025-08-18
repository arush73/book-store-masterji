import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import {ApiResponse} from "../utils/ApiResponse.js"
import { User } from '../models/user.model.js'
import bcrypt from 'bcryptjs'

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body

  if (!username || !email || !password)
    throw new ApiError(400, 'Please provide all required fields')

  const existingUser = await User.find({
    $or: [{ username: username }, { email: email }],
  })
  if (!existingUser.length === 0) throw new ApiError(400, 'User already exists')

  const hashPassword = await bcrypt.hash(password, 10)
  console.log(hashPassword)
  console.log(password)

  const user = await User.create({
    username,
    email,
    password: hashPassword,
  })
  if (!user) throw new ApiError(500, 'User registration failed')

  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()

  return res
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    })
    .status(201)
    .json(new ApiResponse(201, 'User registered successfully', user))
})

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  if (!email || !password)
    throw new ApiError(400, 'Please provide all required fields')

  const user = await User.findOne({ email })
  if (!user) throw new ApiError(404, 'User not found')

  const isPasswordValid = await user.comparePassword(password)
  console.log(isPasswordValid)
  if (!isPasswordValid) throw new ApiError(401, 'Invalid credentials')

  const accessToken = user.generateAccessToken()
  const refreshToken = user.generateRefreshToken()

  return res
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    })
    .cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
    })
    .status(200)
    .json(new ApiResponse(200, 'User logged in successfully', user))
})

// will have to study about it !!!!
const getApiKey = asyncHandler(async (req, res) => {})

const getUser = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const user = await User.findById(userId).select('-password -__v')
  if (!user) throw new ApiError(404, 'User not found')

  res
    .status(200)
    .json(new ApiResponse(200, 'User retrieved successfully', user))
})

export { registerUser, loginUser, getApiKey, getUser }
