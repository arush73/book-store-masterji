import mongoose, { Schema } from 'mongoose'

const profileSchema = new Schema(
  {
    firstName: {
      type: String,
      default: 'John',
    },
    lastName: {
      type: String,
      default: 'Doe',
    },
    phoneNumber: {
      type: String,
      default: '',
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

export const EcomProfile = mongoose.model('EcomProfile', profileSchema)
