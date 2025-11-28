import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import { hasZodFastifySchemaValidationErrors, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { createLinkRoute } from "./routes/create-link";
import { deleteLinkRoute } from "./routes/delete-link";
import { exportLinkRoute } from "./routes/export-link";
import { getLinkRoute } from "./routes/get-link";
import { getLinkByIdRoute } from "./routes/get-link-by-id";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: error.validation,
    })
  }

  console.error(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})

server.register(fastifyCors, { 
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
});

server.register(fastifyMultipart)
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Brevly Server',
      version: '1.0.0',
    },
  },
});

server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});

server.register(getLinkRoute);
server.register(createLinkRoute);
server.register(exportLinkRoute);
server.register(deleteLinkRoute);
server.register(getLinkByIdRoute);

server.listen({ port: 3333, host: "0.0.0.0" }).then(() => {
	console.log("HTTP server is running! teste");
});
