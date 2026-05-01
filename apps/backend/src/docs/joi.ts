import type { Schema } from "joi";
import joiToSwagger from "joi-to-swagger";
import type { OpenAPIV3 } from "openapi-types";

export const joiSchemaToOpenApi = (schema: Schema): OpenAPIV3.SchemaObject => {
  const { swagger } = joiToSwagger(schema);
  return swagger as OpenAPIV3.SchemaObject;
};
