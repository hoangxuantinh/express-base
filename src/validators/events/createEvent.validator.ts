import { body } from 'express-validator'

export const createEventInputValidateChain = [
  body('eventName').notEmpty().isLength({
    min: 8
  }),
  body('startDate').notEmpty().isDate(),
  body('dueDate').notEmpty().isDate(),
  body('description').notEmpty()
]
