import type { Response } from 'express'
import { connectMongoDB } from './database/database'

import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

connectMongoDB()

app.get('/', (_req, res) => {
  res.send('Express + TypeScript Server')
})

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
