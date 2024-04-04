import { FastifyInstance } from 'fastify'

import { knex } from '../../config/database'
import { checkIfExistsSessionId } from '../middleware/check-if-exists-session-id'

export const getMealMetricsRoute = async (app: FastifyInstance) => {
  app
    .addHook('preHandler', checkIfExistsSessionId)
    .get('/meals/metrics', async (request, reply) => {
      const sessionId = request.cookies.sessionId
      const meals = await knex('meals')
        .where({
          session_id: sessionId,
        })
        .select('*')

      const { total, inDient, notInDient, betSequence } = meals.reduce(
        (acc, meal) => {
          acc.total += 1

          if (meal.in_diet) {
            acc.inDient += 1
            acc.currentSequence += 1
          } else {
            acc.notInDient += 1
            acc.currentSequence = 0
          }

          if (acc.currentSequence > acc.betSequence) {
            acc.betSequence = acc.currentSequence
          }

          return acc
        },
        {
          total: 0,
          inDient: 0,
          notInDient: 0,
          betSequence: 0,
          currentSequence: 0,
        },
      )

      return reply.send({
        metrics: {
          total,
          inDient,
          notInDient,
          betSequence,
        },
      })
    })
}
