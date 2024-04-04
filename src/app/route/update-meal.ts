import { z } from 'zod'
import { FastifyInstance } from 'fastify'

import { knex } from '../../config/database'
import { checkIfExistsSessionId } from '../middleware/check-if-exists-session-id'

export const updateMealRoute = async (app: FastifyInstance) => {
  app
    .addHook('preHandler', checkIfExistsSessionId)
    .put('/meals/:id', async (request, reply) => {
      const updateMealBodySchema = z.object({
        name: z.string(),
        description: z.string(),
        meal_datetime: z.string().datetime(),
        in_diet: z.boolean(),
      })
      const updateMealParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const body = updateMealBodySchema.parse(request.body)
      const { id } = updateMealParamsSchema.parse(request.params)

      const meal = await knex('meals')
        .where({
          id,
          session_id: request.cookies.sessionId,
        })
        .first()

      if (!meal) {
        return reply.status(404).send()
      }

      await knex('meals').where({ id }).update(body)

      return reply.status(204).send()
    })
}
