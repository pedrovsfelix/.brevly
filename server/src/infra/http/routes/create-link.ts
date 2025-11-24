import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
	server.post(
		"/links",
		{
			schema: {
				summary: "Create an Links",
				body: z.object({
					name: z.string(),
					password: z.string().optional(),
				}),
				response: {
					201: z.object({ linkId: z.string() }),
					400: z
						.object({ message: z.string() })
						.describe("Link already axists."),
				},
			},
		},
		async (request, reply) => {
			await db.insert(schema.links).values({
				originalUrl: "www.google.com",
				shortCode: "www.brevly.com",
				clickCount: 0,
			});
			return reply.status(201).send({ linkId: "teste" });
		},
	);
};
