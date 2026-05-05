import type { Express } from "express";
import swaggerUi from "swagger-ui-express";
import { openApiDocument } from "./openapi";

export const setupSwaggerDocs = (app: Express): void => {
  app.get("/api/docs.json", (_req, res) => {
    res.json(openApiDocument);
  });

  app.use(
    "/api/docs",
    swaggerUi.serve,
    swaggerUi.setup(openApiDocument, {
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true,
      },
    }),
  );
};
