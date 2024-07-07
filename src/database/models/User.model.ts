import type { Document } from 'mongoose'
import { Schema, model } from 'mongoose'

interface IUser extends Document {
  email: string
  password: string
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

const UserModel = model<IUser>('User', UserSchema)

export default UserModel
