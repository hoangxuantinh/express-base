import mongoose from 'mongoose'

const EventSchema = new mongoose.Schema({
  eventName: { type: String, required: true },
  startDate: { type: Date, required: true },
  dueDate: { type: Date, required: true },
  description: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Event', EventSchema)
