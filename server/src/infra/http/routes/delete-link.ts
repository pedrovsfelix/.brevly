import { deleteLink } from "@/app/functions/delete-link";
import { isLeft } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const deleteLinkRoute: FastifyPluginAsyncZod = async server => {
    await server.delete(
        "/links/:id",
        {
            schema: {
                summary: "Delete a link",
                description: "Delete a link by ID",
                tags: ['Links'],

                params: z.object({
                    id: z.string().uuid({ message: "ID inválido" }),
                }),

                response: {
                    204: z.null().describe("Link deletado com sucesso"),
                    400: z.object({ message: z.string() }),
                    404: z.object({ message: z.string() }),
                },
            },
        },
        async (request, reply) => {
            const { id } = request.params;

            const result = await deleteLink({ id });

            if (isLeft(result)) {
                const error = result.left;
        
                return reply.status(404).send({ message: error.message });
            }

            return reply.status(204).send();
        }
    );
};