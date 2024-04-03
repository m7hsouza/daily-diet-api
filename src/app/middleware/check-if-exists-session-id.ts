import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const checkIfExistsSessionId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const parseResponse = z.string().uuid().safeParse(request.cookies.sessionId)
  if (!parseResponse.success) {
    return reply.status(401).send('Unauthorized')
  }
}
