import { ACCOUNT_TYPE_ENUMS, EMAIL_VERIFICATION_STATUS_ENUMS, USER_ROLE_ENUMS } from "@catering/types";

const authUserProperties = {
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
    type: ["string", "null"],
    enum: [...Object.values(USER_ROLE_ENUMS), null],
  },
  tenantId: {
    type: ["string", "null"],
  },
  jobProfileId: {
    type: ["string", "null"],
  },
} as const;

export const openApiSchemas = {
  ApiMessageResponse: {
    type: "object",
    properties: {
      message: { type: "string" },
      statusCode: { type: "integer", example: 200 },
    },
    required: ["message", "statusCode"],
  },
  ApiErrorResponse: {
    type: "object",
    properties: {
      message: { type: "string", example: "Invalid email or password." },
      statusCode: { type: "integer", example: 400 },
    },
    required: ["message", "statusCode"],
  },
  AuthUser: {
    type: "object",
    properties: authUserProperties,
    required: ["_id", "email", "emailVerificationStatus", "type"],
  },
  AuthUserWithTokens: {
    allOf: [
      { $ref: "#/components/schemas/AuthUser" },
      {
        type: "object",
        properties: {
          accessToken: { type: "string" },
          refreshToken: { type: "string" },
        },
        required: ["accessToken", "refreshToken"],
      },
    ],
  },
  AuthSession: {
    type: "object",
    properties: {
      user: { $ref: "#/components/schemas/AuthUser" },
      tenantId: { type: ["string", "null"] },
      accessToken: { type: "string" },
      refreshToken: { type: "string" },
    },
    required: ["user", "tenantId", "accessToken", "refreshToken"],
  },
  AuthRegisterRequest: {
    type: "object",
    properties: {
      firstName: { type: "string", maxLength: 20 },
      lastName: { type: "string", maxLength: 20 },
      email: { type: "string", format: "email", maxLength: 50 },
      password: { type: "string", minLength: 8, maxLength: 50 },
      type: {
        type: "string",
        enum: Object.values(ACCOUNT_TYPE_ENUMS),
      },
      invitationToken: { type: "string", nullable: true },
      tenantId: { type: ["string", "null"] },
    },
    required: ["firstName", "lastName", "email", "password", "type"],
  },
  AuthLoginRequest: {
    type: "object",
    properties: {
      email: { type: "string", format: "email", maxLength: 50 },
      password: { type: "string", minLength: 8, maxLength: 50 },
    },
    required: ["email", "password"],
  },
  AuthResendVerificationRequest: {
    type: "object",
    properties: {
      email: { type: "string", format: "email", maxLength: 50 },
    },
    required: ["email"],
  },
  AuthRecoverRequest: {
    type: "object",
    properties: {
      email: { type: "string", format: "email", maxLength: 50 },
    },
    required: ["email"],
  },
  AuthVerifyRecoveryRequest: {
    type: "object",
    properties: {
      password: { type: "string", minLength: 8, maxLength: 50 },
    },
    required: ["password"],
  },
  RegistrationTokenQuery: {
    type: "object",
    properties: {
      registration_token: { type: "string" },
    },
    required: ["registration_token"],
  },
  RecoveryTokenQuery: {
    type: "object",
    properties: {
      recovery_token: { type: "string" },
    },
    required: ["recovery_token"],
  },
} as const;
