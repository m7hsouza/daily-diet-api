import { FastifyInstance } from 'fastify'

import { knex } from '../../config/database'
import { checkIfExistsSessionId } from '../middleware/check-if-exists-session-id'

export const listMealsRoute = async (app: FastifyInstance) => {
  app
    .addHook('preHandler', checkIfExistsSessionId)
    .get('/meals', async (request, reply) => {
      const sessionId = request.cookies.sessionId
      const meals = await knex('meals')
        .where({
          session_id: sessionId,
        })
        .select('*')
      return reply.send({ meals })
    })
}
