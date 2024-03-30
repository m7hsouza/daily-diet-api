import fastify from 'fastify'

const app = fastify()

app.get('/', async () => {
  return { hello: 'world' }
})

export { app }
