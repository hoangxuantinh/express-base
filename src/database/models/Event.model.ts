import mongoose, { model, Schema } from 'mongoose'
import type { IUser } from './User.model'
export interface IEvent extends Document {
  id: number
  eventName: string
  description: string
  user: IUser
}

const EventSchema = new Schema<IEvent>(
  {
    eventName: { type: String, required: [true, 'Event must have name' ]},
    description: { type: String, required: [true, 'Event must have description' ] },
  },
  {
    timestamps: true
  }
)

export const Event = model('Event', EventSchema)
