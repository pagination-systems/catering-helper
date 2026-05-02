import type { OpenAPIV3 } from "openapi-types";
import { authComponents, authPaths } from "../v1/modules/authentication/auth.docs";

export const openApiDocument: OpenAPIV3.Document = {
  openapi: "3.0.3",
  info: {
    title: "Catering Helper API",
    version: "1.0.0",
    description: "Interactive API documentation and testing for the backend service.",
  },
  servers: [
    {
      url: "/",
      description: "Current server",
    },
  ],
  tags: [
    {
      name: "Authentication",
      description: "User registration, login, verification, and recovery flows.",
    },
  ],
  paths: {
    ...authPaths,
  },
  components: {
    schemas: authComponents.schemas as OpenAPIV3.ComponentsObject["schemas"],
    securitySchemes: authComponents.securitySchemes as OpenAPIV3.ComponentsObject["securitySchemes"],
  },
};
