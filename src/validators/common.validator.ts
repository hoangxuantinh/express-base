import { STATUS } from '../constants/status'
import type { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

export const commonValidate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty) {
    return res.send(STATUS.BAD_REQUEST).json({ errors: errors.array() })
  }
  next()
}
