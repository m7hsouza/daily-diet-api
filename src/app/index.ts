import fastify from 'fastify'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie)

app.get('/', async () => {
  return { hello: 'world' }
})

export { app }
