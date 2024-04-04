import { FastifyInstance } from 'fastify'

import { knex } from '../../config/database'
import { checkIfExistsSessionId } from '../middleware/check-if-exists-session-id'

export const getMealMetricsRoute = async (app: FastifyInstance) => {
  app
    .addHook('preHandler', checkIfExistsSessionId)
    .get('/meals/metrics', async (request, reply) => {
      const sessionId = request.cookies.sessionId
      const metrics = (await knex('meals')
        .where({
          session_id: sessionId,
        })
        .groupBy('in_diet')
        .count('id as amount')
        .select('in_diet')) as { amount: number; in_diet: boolean }[]

      const mealsCount = metrics.reduce((acc, metric) => {
        acc += metric.amount
        return acc
      }, 0)

      const inDietCount = metrics.find((metric) => metric.in_diet)?.amount || 0

      return reply.send({
        metrics: {
          total: mealsCount,
          in_diet: inDietCount,
          not_in_diet: mealsCount - inDietCount,
        },
      })
    })
}
