import request from 'supertest'
import server from '../server'
import app from '@/app'

afterAll((done) => {
  server.close(done)
})

describe('Auth APIs', () => {
  it('should login success', async () => {
    const res = await request(app).post('/api/v1/auth/login').send({
      email: 'account1@gmail.com',
      password: 'password1'
    })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('accessToken')
  })
})
