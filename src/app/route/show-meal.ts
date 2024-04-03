import { z } from 'zod'
import { FastifyInstance } from 'fastify'

import { knex } from '../../config/database'

export const showMealRoute = async (app: FastifyInstance) => {
  app.get('/meals/:id', async (request, reply) => {
    const showMealParamsSchema = z.object({
      id: z.string().uuid(),
    })
    const { id } = showMealParamsSchema.parse(request.params)
    const meal = await knex('meals')
      .where({
        id,
        session_id: request.cookies.sessionId,
      })
      .first()
    return reply.send({ meal })
  })
}
