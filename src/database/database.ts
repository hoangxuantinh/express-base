import mongoose from 'mongoose'
import chalk from 'chalk'

const dbURL = `mongodb+srv://hxt2849:0327403079t@cluster0.nrpq8eb.mongodb.net`
const connected = chalk.bold.cyan
const error = chalk.bold.yellow
const disconnected = chalk.bold.red
const termination = chalk.bold.magenta

export const connectMongoDB = async () => {
  mongoose.connect(
    dbURL,
    {
      useMongoClient: true,
      poolSize: 10,
      bufferMaxEntries: 0
    },
    (error) => {
      console.log('error owr day ', error)
    }
  )

  mongoose.connection.on('connected', function () {
    console.log(connected('Mongoose default connection is open to MongoDB Atlas'))
  })

  mongoose.connection.on('error', function (err: Error) {
    console.log(error('Mongoose default connection has occured ' + err + ' error'))
  })

  mongoose.connection.on('disconnected', function () {
    console.log(disconnected('Mongoose default connection is disconnected'))
  })

  process.on('SIGINT', function () {
    mongoose.connection.close(function () {
      console.log(termination('Mongoose default connection is disconnected due to application termination'))
      process.exit(0)
    })
  })
}

export const isValidId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id)
}
