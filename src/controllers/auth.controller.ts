import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import type { Request, Response } from 'express'
import { User } from '@/database/models/User.model'
import { STATUS } from '@/constants/status'

class AuthController {
  public login = async (req: Request, res: Response) => {
    try {
      // logger.info(`Received a ${req.method} request for ${req.url}`)

      const { password: reqPassword } = req.body
      const user = await User.findOne({ email: req.body.email })
      if (!user) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: 'Email not found!'
        })
      }
      const match = await bcrypt.compare(reqPassword, user.password)
      if (!match) {
        return res.status(STATUS.BAD_REQUEST).json({
          message: 'Wrong Password!'
        })
      }

      const { _id: userId, name, email } = user
      const accessToken = jwt.sign({ userId, name, email }, String(process.env.ACCESS_TOKEN_SECRET), {
        expiresIn: '1h'
      })
      const refreshToken = jwt.sign({ userId, name, email }, String(process.env.REFRESH_TOKEN_SECRET), {
        expiresIn: '1d'
      })

      await User.updateOne(
        { _id: userId },
        {
          $set: {
            refresh_token: refreshToken
          }
        }
      )

      return res.status(STATUS.OK).json({
        accessToken
      })
    } catch (error) {
      return res.status(STATUS.INTERNAL_SERVER_ERROR).json({ message: `Internal Server Error:  ${error}` })
    }
  }
}

export default new AuthController()
