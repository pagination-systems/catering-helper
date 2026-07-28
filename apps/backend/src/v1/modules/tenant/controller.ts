import { TenantAbilityBuilder, TenantAuthZEntity } from "@catering/authz";
import { AbilityAction, TENANT_STATUS_ENUMS } from "@catering/types";
import { MongoQuery } from "@ims-systems-00/ims-query-builder";
import { StatusCodes } from "http-status-codes";
import {
  ApiResponse,
  type AuthenticatedControllerParams,
  type ControllerParams,
  formatListResponse,
  NotFoundException,
  UnauthorizedException,
} from "../../../common/helper";
import { roleScopedSecurityQuery } from "./query";
import * as tenantService from "./service";

export const list = async ({ req }: AuthenticatedControllerParams) => {
  const ability = new TenantAbilityBuilder(req.session).getAbility();

  if (!ability.can(AbilityAction.READ, TenantAuthZEntity)) {
    throw new UnauthorizedException("You are not authorized to read tenants.");
  }

  const filter = new MongoQuery(req.query, { searchFields: ["name", "slug", "location"] }).build();

  const finalQuery = {
    $and: [filter.getFilterQuery(), roleScopedSecurityQuery(ability)],
  };

  const results = await tenantService.list({
    query: finalQuery,
    options: filter.getQueryOptions(),
  });

  const { data, pagination } = formatListResponse(results);

  return new ApiResponse({
    message: "Tenants retrieved",
    statusCode: StatusCodes.OK,
    data,
    fieldName: "tenants",
    pagination,
  });
};

export const getOne = async ({ req }: AuthenticatedControllerParams) => {
  const ability = new TenantAbilityBuilder(req.session).getAbility();

  const tenant = await tenantService.getOne({ query: { _id: req.params.id } });

  if (!tenant || !ability.can(AbilityAction.READ, new TenantAuthZEntity({ id: tenant._id?.toString() }))) {
    throw new UnauthorizedException("You are not authorized to read this tenant.");
  }

  return new ApiResponse({
    message: "Tenant retrieved.",
    statusCode: StatusCodes.OK,
    data: tenant,
    fieldName: "tenant",
  });
};

export const create = async ({ req }: AuthenticatedControllerParams) => {
  const ability = new TenantAbilityBuilder(req.session).getAbility();

  // Check against a concrete (id-less) entity so tenant-scoped CREATE grants
  // (e.g. a caterer's own tenant) don't authorize creating brand-new tenants.
  if (!ability.can(AbilityAction.CREATE, new TenantAuthZEntity({}))) {
    throw new UnauthorizedException("You are not authorized to create a tenant.");
  }

  const { owner, ...payload } = req.body;

  const tenant = await tenantService.onboardCaterer({ payload, owner });

  return new ApiResponse({
    message: "Caterer onboarded successfully.",
    statusCode: StatusCodes.CREATED,
    data: tenant,
    fieldName: "tenant",
  });
};

// --- Public storefront endpoints (no authentication) ---

export const listPublic = async ({ req }: ControllerParams) => {
  const filter = new MongoQuery(req.query, { searchFields: ["name", "slug", "location", "area"] }).build();

  const finalQuery = {
    $and: [filter.getFilterQuery(), { status: TENANT_STATUS_ENUMS.ACTIVE }],
  };

  const results = await tenantService.list({
    query: finalQuery,
    options: filter.getQueryOptions(),
  });

  const { data, pagination } = formatListResponse(results);

  return new ApiResponse({
    message: "Tenants retrieved",
    statusCode: StatusCodes.OK,
    data,
    fieldName: "tenants",
    pagination,
  });
};

export const getBySlug = async ({ req }: ControllerParams) => {
  const tenant = await tenantService.getOne({
    query: { slug: req.params.slug, status: TENANT_STATUS_ENUMS.ACTIVE },
  });

  return new ApiResponse({
    message: "Tenant retrieved.",
    statusCode: StatusCodes.OK,
    data: tenant,
    fieldName: "tenant",
  });
};

// Reserved labels that belong to the platform itself, not to any tenant. They
// have their own Caddy site blocks, but allow-list them here too so on-demand
// TLS never blocks a legitimate platform host.
const RESERVED_HOST_LABELS = new Set(["www", "api", "app", "admin"]);

/**
 * On-demand TLS gate for Caddy. Caddy calls this (`?domain=<host>`) before
 * minting a certificate for a tenant subdomain: a 2xx allows issuance, anything
 * else denies it — which stops random hostnames pointed at the server from
 * exhausting the ACME issuer's rate limits.
 */
export const checkDomain = async ({ req }: ControllerParams) => {
  const host = String(req.query.domain ?? "")
    .split(":")[0]
    .toLowerCase();
  const label = host.split(".")[0];

  const allowed =
    RESERVED_HOST_LABELS.has(label) ||
    Boolean(await tenantService.getOne({ query: { slug: label, status: TENANT_STATUS_ENUMS.ACTIVE } }));

  if (!allowed) throw new NotFoundException(`No active tenant for host "${host}".`);

  return new ApiResponse({
    message: "ok",
    statusCode: StatusCodes.OK,
    data: null,
    fieldName: "domain",
  });
};
