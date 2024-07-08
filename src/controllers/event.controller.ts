/* eslint-disable @typescript-eslint/no-explicit-any */

import { STATUS } from '@/constants/status'
import type { IEvent } from '@/database/models/Event.model'
import { Event } from '@/database/models/Event.model'
import type { Response } from 'express'

export type CustomRequest = Record<string, any>
class EventController {
  async addEvent(req: CustomRequest, res: Response) {
    try {
      const { eventName, startDate, dueDate, description } = req.body
      const { userId } = req
      const event = new Event({
        eventName,
        startDate,
        dueDate,
        description,
        userId: userId
      })

      await event.save()

      return res.status(STATUS.OK).json({
        status: 'OK',
        message: 'Create Event Success!'
      })
    } catch (error) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Internal Server Error:  ${error}` })
    }
  }

  async updateEvent(req: CustomRequest, res: Response) {
    const { id: eventId } = req.params
    const { eventName, startDate, dueDate, description } = req.body
    try {
      const event = await Event.findOneAndUpdate(
        { _id: eventId },
        { eventName, startDate, dueDate, description },
        { new: true }
      )

      if (!event) return res.status(STATUS.NOT_FOUND).send('Event not found')

      res.status(STATUS.OK).send(event)
    } catch (err) {
      res.status(STATUS.INTERNAL_SERVER_ERROR).send(err)
    }
  }

  async deleteEvent(req: CustomRequest, res: Response) {
    const { id } = req.params

    try {
      const event = await Event.findOneAndDelete({ _id: id })

      if (!event)
        return res.status(404).send({
          message: 'Event not found!'
        })

      res.status(STATUS.OK).send({
        message: 'Event deleted!'
      })
    } catch (err) {
      res.status(STATUS.INTERNAL_SERVER_ERROR).send(err)
    }
  }

  async getEvents(req: CustomRequest, res: Response) {
    const { page = 1, perPage = 10, sort = 'startDate' } = req.query
    try {
      const events = await Event.find()
        .sort({ [sort]: 1 })
        .skip((page - 1) * perPage)
        .limit(parseInt(perPage))
        .exec(function (err: any, results: any) {
          Event.countDocuments().exec(function (err: any, count: any) {
            res.status(200).json({
              items: results.map((e: IEvent) => ({ ...e._doc, ended: new Date(e._doc.dueDate) < new Date() })),
              pagination: {
                total: count,
                page,
                perPage
              }
            })
          })
        })
    } catch (err) {
      res.status(STATUS.INTERNAL_SERVER_ERROR).send(err)
    }
  }
}

export default new EventController()
