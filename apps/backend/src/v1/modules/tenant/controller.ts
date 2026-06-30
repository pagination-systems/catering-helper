import { TenantAbilityBuilder, TenantAuthZEntity } from "@catering/authz";
import { AbilityAction, TENANT_STATUS_ENUMS } from "@catering/types";
import { MongoQuery } from "@ims-systems-00/ims-query-builder";
import { StatusCodes } from "http-status-codes";
import {
  ApiResponse,
  type AuthenticatedControllerParams,
  type ControllerParams,
  formatListResponse,
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

  if (!ability.can(AbilityAction.CREATE, TenantAuthZEntity)) {
    throw new UnauthorizedException("You are not authorized to create a tenant.");
  }

  const tenant = await tenantService.create({ payload: req.body });

  return new ApiResponse({
    message: "Tenant created.",
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
