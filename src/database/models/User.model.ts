import { model, Schema } from 'mongoose'

export interface IUser {
  id: number
  email: string
  password: string
  refreshToken: string
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    refreshToken: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

export const User = model('users', UserSchema)
