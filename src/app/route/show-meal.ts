import { z } from 'zod'
import { FastifyInstance } from 'fastify'

import { knex } from '../../config/database'
import { checkIfExistsSessionId } from '../middleware/check-if-exists-session-id'

export const showMealRoute = async (app: FastifyInstance) => {
  app
    .addHook('preHandler', checkIfExistsSessionId)
    .get('/meals/:id', async (request, reply) => {
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

      if (!meal) {
        return reply.status(404).send()
      }
      return reply.send({ meal })
    })
}
