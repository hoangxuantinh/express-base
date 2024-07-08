import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
export const connectMongoDB = async () => {
  mongoose.connect(String(process.env.DB_URL), {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
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
  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log('Mongoose default connection is disconnected due to application termination')
      process.exit(0)
    })
  })
}
