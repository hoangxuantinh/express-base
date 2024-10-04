/* eslint-disable @typescript-eslint/no-explicit-any */
import { STATUS } from '@/constants/status'
import type { NextFunction, Request, Response } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'
import { logger } from './Log'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JwtCustom = JwtPayload & Record<string, any>
export const verifyToken = (req: any, res: Response, next: NextFunction) => {
  logger.info(`Received a ${req.method} request for ${req.url}`)
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token == null) {
    return res.status(STATUS.UNAUTHORIZED).json({ message: "You're not authorize!" })
  }
  jwt.verify(token, String(process.env.ACCESS_TOKEN_SECRET), async (err: any, decoded: any) => {
    if (err) {
      return res.status(STATUS.FORBIDDEN).json({ message: 'Forbidden Access!' })
    }

    req.userId = decoded.userId
    next()
  })
}
