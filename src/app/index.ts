import fastify from 'fastify'
import cookie from '@fastify/cookie'

import { createMealRoute } from './route/create-meal'

const app = fastify()

app.register(cookie)

app.register(createMealRoute)

export { app }
