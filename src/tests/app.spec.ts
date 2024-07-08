import request from 'supertest'

import server from '../server'
import app from '@/app'

afterAll((done) => {
  server.close(done)
})

describe('GET /', () => {
  it('response to hello world!', async () => {
    const response = await request(app).get('/')
    expect(response.status).toBe(200)
    expect(response.text).toBe('Hello world!')
  })
})
