import { getLinkById } from "@/app/functions/get-link-by-id";
import { isLeft, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const getLinkByIdRoute: FastifyPluginAsyncZod = async server => {
    await server.get(
        "/links/:id",
        {
            schema: {
                summary: "Get link by ID",
                description: "Get a link's original URL by its ID and increment click count",
                tags: ['Links'],
                params: z.object({
                    id: z.string(),
                }),
                response: {
                    200: z.object({
                        id: z.string(),
                        originalUrl: z.string().url(),
                        shortUrl: z.string(),
                        accessClick: z.number(),
                        createdAt: z.string(),
                    }),
                    404: z.object({
                        message: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            const { id } = request.params;

            const result = await getLinkById({ id });

            if (isLeft(result)) {
                return reply.status(404).send({ message: result.left.message });
            }

            return reply.status(200).send(unwrapEither(result));
        }
    );
};
