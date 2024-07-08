import { body } from 'express-validator'
export const loginValidateChain = [
  body('email').notEmpty().isEmail().withMessage('Provide valid email'),
  body('password').notEmpty()
]
