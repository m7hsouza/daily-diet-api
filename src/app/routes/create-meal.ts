import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

import { knex } from '../../config/database'

export const createMealRoute = async (app: FastifyInstance) => {
  app.post('/meals', async (request, reply) => {
    const createMealBodySchema = z.object({
      name: z.string(),
      description: z.string(),
      meal_datetime: z.string().datetime(),
      in_diet: z.boolean(),
    })

    const body = createMealBodySchema.parse(request.body)
    let seesionId = request.cookies.sessionId
    if (!seesionId) {
      seesionId = randomUUID()
      reply.setCookie('sessionId', seesionId)
    }

    await knex('meals').insert({
      ...body,
      id: randomUUID(),
      session_id: seesionId,
    })

    return reply.status(201).send()
  })
}
