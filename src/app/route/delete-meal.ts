import { z } from 'zod'
import { FastifyInstance } from 'fastify'

import { knex } from '../../config/database'
import { checkIfExistsSessionId } from '../middleware/check-if-exists-session-id'

export const deleteMealRoute = async (app: FastifyInstance) => {
  app
    .addHook('preHandler', checkIfExistsSessionId)
    .delete('/meals/:id', async (request, reply) => {
      const updateMealParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = updateMealParamsSchema.parse(request.params)

      const deletedCount = await knex('meals')
        .where({
          id,
          session_id: request.cookies.sessionId,
        })
        .delete()

      if (deletedCount === 0) {
        return reply.status(404).send()
      }

      return reply.status(204).send()
    })
}
