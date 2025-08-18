import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
)

// userSchema.pre('save', async (next) => {
//   if (!this.isModified('password')) return next()
//   this.password = await bcrypt.hash(this.password, 10)
//   next()
// })

userSchema.methods.comparePassword = async function (candidatePassword) {
  console.log(this.password)
  console.log(candidatePassword)
  return await bcrypt.compare(candidatePassword, this.password)
}

userSchema.methods.generateAccessToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  })
}

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id, role: this.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  })
}

export const User = mongoose.model('User', userSchema)
