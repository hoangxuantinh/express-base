import type { NextFunction, Request, Response } from 'express'
import { ROUTE_PREFIX } from './constants/prefix'
import { connectMongoDB } from './database/connect'

import express from 'express'
import AuthRoute from './routes/auth.route'
import EventRoute from './routes/event.route'

const app = express()

// connectMongoDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world!!!')
})

app.use(`${ROUTE_PREFIX}/auth`, AuthRoute)
app.use(`${ROUTE_PREFIX}/event`, EventRoute)

app.use((req: Request, res: Response, next: NextFunction) => {
  next({
    status: 404,
    message: 'Not found!'
  })
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status)
  res.send({
    error: {
      code: error.code,
      message: error.message
    }
  })
})

export default app
