
import { getLinkById } from "@/app/functions/get-link-by-id";
import { isLeft, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const getLinkByIdRoute: FastifyPluginAsyncZod = async server => {
    await server.get(
        "/links/:id",
        {
            schema: {
                summary: "Get original URL",
                description: "Get original URL and increment click count",
                tags: ['Links'],
                params: z.object({
                    id: z.string(),
                }),
                response: {
                    200: z.object({
                        originalUrl: z.string().url(),
                    }),
                    404: z.object({
                        message: z.string(),
                    }),
                },
            },
        },
        async (request, reply) => {
            const { id } = request.params;

            const result = await getLinkById({
                shortUrl: id,
            });

            if (isLeft(result)) {
                return reply.status(404).send({ message: result.left.message });
            }

            const { originalUrl } = unwrapEither(result);

            return reply.status(200).send({ originalUrl });
        }
    );
};