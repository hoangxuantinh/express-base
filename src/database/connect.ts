import mongoose from 'mongoose'
import dotenv from 'dotenv'

import { DB_CONFIG } from '../config/db.config'

dotenv.config()
const dbUrl = `mongodb://${DB_CONFIG.MONGO_USER}:${DB_CONFIG.MONGO_PASSWORD}@${DB_CONFIG.MONGO_IP}:${DB_CONFIG.MONGO_PORT}?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+2.3.1`
export const connectMongoDB = async () => {
  console.log('🚀 ~ dbUrl:', dbUrl)
  mongoose.connect(String(dbUrl), {
    family: 4,
  })
  mongoose.connection.on('connected', function () {
    console.log('Mongoose default connection is open to MongoDB Atlas')
  })
  mongoose.connection.on('error', function (err: Error) {
    console.log('Mongoose default connection has occured ' + err + ' error')
  })
  mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection is disconnected')
  })
}
