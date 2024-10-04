import { Router } from 'express'
import { createEventInputValidateChain } from '@/validators/events/createEvent.validator'
import { verifyToken } from '@/middlewares/auth.middleware'
import { commonValidate } from '@/validators/common.validator'
import EventController from '@/controllers/event.controller'

const EventRoute = Router()
EventRoute.route('/').get(EventController.getEvents).post(EventController.addEvent)


EventRoute.route('/:id').patch(EventController.updateEvent).delete(EventController.deleteEvent)


// EventRoute.get('/', verifyToken, EventController.getEvents)
// EventRoute.post('/', verifyToken, createEventInputValidateChain, commonValidate, EventController.addEvent)
// EventRoute.put('/:id', verifyToken, createEventInputValidateChain, commonValidate, EventController.updateEvent)
// EventRoute.delete('/:id', verifyToken, EventController.deleteEvent)

export default EventRoute
