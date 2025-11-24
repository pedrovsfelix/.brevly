import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
	server.post("/links", () => {
		return "hello";
	});
};
