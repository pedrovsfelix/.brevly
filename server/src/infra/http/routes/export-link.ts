import { exportUploads } from "@/app/functions/export-links";
import { unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const exportLinkRoute: FastifyPluginAsyncZod = async server => {
    await server.post(
        "/links/export",
        {
            schema: {
                summary: "Export links to CSV",
                description: "Generates a CSV file with links based on search query",
                tags: ['Links'],
                body: z.object({
                    searchQuery: z.string().optional(),
                }),
                response: {
                    200: z.object({
                        reportLinks: z.string().url(),
                    }),
                },
            },
        },
        async (request, reply) => {
            const { searchQuery } = request.body;

            const result = await exportUploads({
                searchQuery,
            });

            const { reportLinks } = unwrapEither(result);

            return reply.status(200).send({ reportLinks });
        }
    );
};