import mongoose, { model, Schema } from 'mongoose'
import type { IUser } from './User.model'
export interface IEvent extends Document {
  id: number
  eventName: string
  startDate: Date
  dueDate: Date
  description: string
  user: IUser
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _doc: any
}

const EventSchema = new Schema<IEvent>(
  {
    eventName: { type: String, required: true },
    startDate: { type: Date, required: true },
    dueDate: { type: Date, required: true },
    description: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' }
  },
  {
    timestamps: true
  }
)

export const Event = model('Event', EventSchema)
