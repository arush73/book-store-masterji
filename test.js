import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
await mongoose.connect('mongodb://localhost:27017/bookstore')

import { User } from './src/models/user.model.js'

const user = await User.findOne({ username: 'arush73' })
console.log(user)

console.log(
  await bcrypt.compare(
    '12345678',
    '$2b$10$5g6z5dIz0sgdjfNobwu/IeTA2Y3Uxg1NCDcx/VmfmlFA8c2RbBshC'
  )
)

var choot = await bcrypt.hash('12345678', 10)

console.log(await bcrypt.compare('12345678', choot))

// console.log(await User.findById(user._id))
console.log(user._id)
console.log(await User.findByIdAndDelete(user._id))

// import bcrypt from "bcryptjs"
// console.log(
//   await bcrypt.compare(
//     '12345678',
//     '$2b$10$YUfB511ud4X48Dk1NOtT4OqRLwatnZ55TebVQvc8SYVVcWOU3LHS2'
//   )
// )