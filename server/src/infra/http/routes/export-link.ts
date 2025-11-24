import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const exportLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.post("/links", () => {
		return "hello";
	});
};
