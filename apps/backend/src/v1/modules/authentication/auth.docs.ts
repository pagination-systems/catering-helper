import { ACCOUNT_TYPE_ENUMS, EMAIL_VERIFICATION_STATUS_ENUMS, USER_ROLE_ENUMS } from "@catering/types";
import type { OpenAPIV3 } from "openapi-types";
import { joiSchemaToOpenApi } from "../../../docs/joi";
import {
  loginBodySchema,
  recoverAccountBodySchema,
  registerBodySchema,
  resendVerificationBodySchema,
  verifyRecoveryBodySchema,
  verifyRecoveryQuerySchema,
  verifyRegistrationQuerySchema,
} from "./auth.validation";

const cookieAuth: OpenAPIV3.SecuritySchemeObject = {
  type: "apiKey",
  in: "cookie",
  name: "__imsat__",
};

const responseSchema = (
  properties: Record<string, OpenAPIV3.SchemaObject | OpenAPIV3.ReferenceObject>,
  required: string[],
): OpenAPIV3.SchemaObject => ({
  type: "object",
  properties,
  required,
});

const authUserSchema: OpenAPIV3.SchemaObject = {
  type: "object",
  properties: {
    _id: { type: "string" },
    id: { type: "string" },
    firstName: { type: "string" },
    lastName: { type: "string" },
    fullName: { type: "string" },
    email: { type: "string", format: "email" },
    emailVerificationStatus: {
      type: "string",
      enum: Object.values(EMAIL_VERIFICATION_STATUS_ENUMS),
    },
    type: {
      type: "string",
      enum: Object.values(ACCOUNT_TYPE_ENUMS),
    },
    role: {
      type: "string",
      enum: Object.values(USER_ROLE_ENUMS),
      nullable: true,
    },
    tenantId: {
      type: "string",
      nullable: true,
    },
    jobProfileId: {
      type: "string",
      nullable: true,
    },
  },
  required: ["_id", "email", "emailVerificationStatus", "type"],
};

const requestSchemas = {
  AuthLoginRequest: joiSchemaToOpenApi(loginBodySchema),
  AuthRegisterRequest: joiSchemaToOpenApi(registerBodySchema),
  AuthResendVerificationRequest: joiSchemaToOpenApi(resendVerificationBodySchema),
  AuthRecoverRequest: joiSchemaToOpenApi(recoverAccountBodySchema),
  AuthVerifyRecoveryRequest: joiSchemaToOpenApi(verifyRecoveryBodySchema),
  RegistrationTokenQuery: joiSchemaToOpenApi(verifyRegistrationQuerySchema),
  RecoveryTokenQuery: joiSchemaToOpenApi(verifyRecoveryQuerySchema),
} as const;

export const authTags = ["Authentication"] as const;

export const authComponents = {
  schemas: {
    ...requestSchemas,
    ApiMessageResponse: responseSchema({ message: { type: "string" }, statusCode: { type: "integer", example: 200 } }, [
      "message",
      "statusCode",
    ]),
    AuthUser: authUserSchema,
    AuthUserWithTokens: responseSchema(
      {
        ...authUserSchema.properties,
        accessToken: { type: "string" },
        refreshToken: { type: "string" },
      },
      ["_id", "email", "emailVerificationStatus", "type", "accessToken", "refreshToken"],
    ),
    AuthSession: responseSchema(
      {
        user: { $ref: "#/components/schemas/AuthUser" },
        tenantId: { type: "string", nullable: true },
        accessToken: { type: "string" },
        refreshToken: { type: "string" },
      },
      ["user", "tenantId", "accessToken", "refreshToken"],
    ),
  },
  securitySchemes: {
    cookieAuth,
  },
} as const;

export const authPaths: OpenAPIV3.PathsObject = {
  "/api/v1/auth/login": {
    post: {
      tags: [...authTags],
      summary: "Login with email and password",
      description: "Authenticates a user and returns the session cookies plus access tokens.",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/AuthLoginRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "User logged in successfully.",
          content: {
            "application/json": {
              schema: responseSchema(
                {
                  message: { type: "string" },
                  statusCode: { type: "integer" },
                  user: { $ref: "#/components/schemas/AuthUserWithTokens" },
                },
                ["message", "statusCode", "user"],
              ),
            },
          },
        },
      },
    },
  },
  "/api/v1/auth/registration": {
    post: {
      tags: [...authTags],
      summary: "Register a new account",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/AuthRegisterRequest" },
          },
        },
      },
      responses: {
        201: {
          description: "Account created or verification mail queued.",
          content: {
            "application/json": {
              schema: responseSchema(
                {
                  message: { type: "string" },
                  statusCode: { type: "integer" },
                  user: { $ref: "#/components/schemas/AuthUser" },
                },
                ["message", "statusCode", "user"],
              ),
            },
          },
        },
      },
    },
  },
  "/api/v1/auth/registration/verification": {
    post: {
      tags: [...authTags],
      summary: "Verify registration token",
      parameters: [
        {
          name: "registration_token",
          in: "query",
          required: true,
          schema: { $ref: "#/components/schemas/RegistrationTokenQuery" },
        },
      ],
      responses: {
        200: {
          description: "Account verified successfully.",
          content: {
            "application/json": {
              schema: responseSchema(
                {
                  message: { type: "string" },
                  statusCode: { type: "integer" },
                  user: { $ref: "#/components/schemas/AuthUserWithTokens" },
                },
                ["message", "statusCode", "user"],
              ),
            },
          },
        },
      },
    },
  },
  "/api/v1/auth/registration/verification/email": {
    post: {
      tags: [...authTags],
      summary: "Resend registration verification email",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/AuthResendVerificationRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Verification link sent.",
          content: {
            "application/json": {
              schema: responseSchema(
                {
                  message: { type: "string" },
                  statusCode: { type: "integer" },
                  user: { $ref: "#/components/schemas/AuthUser" },
                },
                ["message", "statusCode", "user"],
              ),
            },
          },
        },
      },
    },
  },
  "/api/v1/auth/recovery": {
    post: {
      tags: [...authTags],
      summary: "Request password recovery",
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/AuthRecoverRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Recovery link sent.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiMessageResponse" },
            },
          },
        },
      },
    },
  },
  "/api/v1/auth/recovery/verification": {
    post: {
      tags: [...authTags],
      summary: "Verify password recovery token and update password",
      parameters: [
        {
          name: "recovery_token",
          in: "query",
          required: true,
          schema: { $ref: "#/components/schemas/RecoveryTokenQuery" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/AuthVerifyRecoveryRequest" },
          },
        },
      },
      responses: {
        200: {
          description: "Password recovered successfully.",
          content: {
            "application/json": {
              schema: responseSchema(
                {
                  message: { type: "string" },
                  statusCode: { type: "integer" },
                  user: { $ref: "#/components/schemas/AuthUserWithTokens" },
                },
                ["message", "statusCode", "user"],
              ),
            },
          },
        },
      },
    },
  },
  "/api/v1/auth/refresh-access-token": {
    get: {
      tags: [...authTags],
      summary: "Refresh the access token",
      security: [{ cookieAuth: [] }],
      responses: {
        200: {
          description: "Access token refreshed successfully.",
          content: {
            "application/json": {
              schema: responseSchema(
                {
                  message: { type: "string" },
                  statusCode: { type: "integer" },
                  session: { $ref: "#/components/schemas/AuthSession" },
                },
                ["message", "statusCode", "session"],
              ),
            },
          },
        },
      },
    },
  },
  "/api/v1/auth/logout": {
    delete: {
      tags: [...authTags],
      summary: "Log out the current user",
      security: [{ cookieAuth: [] }],
      responses: {
        200: {
          description: "User logged out successfully.",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ApiMessageResponse" },
            },
          },
        },
      },
    },
  },
};
