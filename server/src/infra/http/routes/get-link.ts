import { getLinks } from "@/app/functions/get-links";
import { unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import z from "zod";

export const createLinkRoute: FastifyPluginAsyncZod = async server => {
	await server.get(
		"/links",
		{
			schema: {
				summary: "Get an Links",
				description: "List of links",
				tags: ['Links'],
				querystring: z.object({
					searchQuery: z.string().optional(),
					sortBy: z.enum(['createdAt']).optional(),
					sortDirection: z.enum(['asc', 'desc']).optional(),
					page: z.coerce.number().optional().default(1),
					pageSize: z.coerce.number().optional().default(10)
				}),
				response: {
					200: z.object({ links: z.array(
						z.object({
							id: z.string(),
							originalUrl: z.string(),
							shortUrl: z.string(),
							accessClick: z.number(),
							createdAt: z.date(),
						})
					),
					total: z.number(),
				 }) .describe('OK'),
				},
			},
		},
		async (request, reply) => {
			const { page, pageSize, searchQuery, sortBy, sortDirection} = request.query;

			const result = await getLinks({
				page,
				pageSize,
				searchQuery,
				sortBy,
				sortDirection,
			})

			const { total, links } = unwrapEither(result)

			return reply.status(200).send({ total, links });
		},
	);
};
