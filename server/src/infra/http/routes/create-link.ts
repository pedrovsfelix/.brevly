import { createLink } from '@/app/functions/create-link'
import { isLeft, unwrapEither } from '@/shared/either'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
  await server.post(
    '/links',
    {
      schema: {
        summary: 'Create a link',
        description: 'Create a link',
        tags: ['Links'],
        body: z.object({
          originalUrl: z.string().url(),
          shortUrl: z.string().regex(/^[a-z0-9-]+$/, {
            message:
              'O shortUrl deve conter apenas letras minúsculas, números e hífens.',
          }),
        }),
        response: {
          201: z.object({ 
            id: z.string().uuid(),
            originalUrl: z.string(),
            shortUrl: z.string(),
            createdAt: z.string().or(z.date()).optional(),
          }),
          400: z.object({ message: z.string() }),
          409: z.object({ message: z.string() }),
        },
      },
    },
    async (request, reply) => {
      const { originalUrl, shortUrl } = request.body

      const result = await createLink({ originalUrl, shortUrl })

      if (isLeft(result)) {
        const error = result.left;

        if (error.constructor.name === 'InvalidShortUrl') {
            return reply.status(400).send({ message: error.message })
        }

        if (error.constructor.name === 'LinkAlreadyExistsError') {
            return reply.status(409).send({ message: error.message })
        }

        return reply.status(400).send({ message: error.message })
      }

      const data = unwrapEither(result)

      return reply.status(201).send(data)
    }
  )
}