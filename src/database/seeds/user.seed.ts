import bcrypt from 'bcryptjs'
import { connectMongoDB } from '../connect'
import { User } from '../models/User.model'

const seedUsers = async () => {
  const users = [
    { email: 'account1@gmail.com', password: 'password1' },
    { email: 'account2@gmail.com', password: 'password2' }
  ]

  for (const user of users) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(user.password, salt)
    user.password = hashedPassword
    const newUser = new User(user)
    await newUser.save()
  }

  console.log('Users seeded successfully!')
  process.exit(0)
}

const seedDB = async () => {
  await connectMongoDB()
  await seedUsers()
}

seedDB()
