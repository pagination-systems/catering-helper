import { PackageAbilityBuilder, PackageAuthZEntity } from "@catering/authz";
import { AbilityAction, PACKAGE_STATUS_ENUM, TENANT_STATUS_ENUMS } from "@catering/types";
import { MongoQuery } from "@ims-systems-00/ims-query-builder";
import { StatusCodes } from "http-status-codes";
import {
  ApiResponse,
  type AuthenticatedControllerParams,
  type ControllerParams,
  formatListResponse,
  UnauthorizedException,
} from "../../../common/helper";
import * as tenantService from "../tenant/service";
import { roleScopedSecurityQuery } from "./query";
import * as packageService from "./service";

export const list = async ({ req }: AuthenticatedControllerParams) => {
  const ability = new PackageAbilityBuilder(req.session).getAbility();

  if (!ability.can(AbilityAction.READ, PackageAuthZEntity)) {
    throw new UnauthorizedException("You are not authorized to read packages.");
  }

  const filter = new MongoQuery(req.query, { searchFields: ["name", "description"] }).build();

  const finalQuery = {
    $and: [filter.getFilterQuery(), roleScopedSecurityQuery(ability)],
  };

  const results = await packageService.list({
    query: finalQuery,
    options: filter.getQueryOptions(),
  });

  const { data, pagination } = formatListResponse(results);

  return new ApiResponse({
    message: "Packages retrieved",
    statusCode: StatusCodes.OK,
    data,
    fieldName: "packages",
    pagination,
  });
};

export const getOne = async ({ req }: AuthenticatedControllerParams) => {
  const ability = new PackageAbilityBuilder(req.session).getAbility();

  const cateringPackage = await packageService.getOne({ query: { _id: req.params.id } });

  if (
    !cateringPackage ||
    !ability.can(AbilityAction.READ, new PackageAuthZEntity({ tenantId: cateringPackage.tenantId?.toString() }))
  ) {
    throw new UnauthorizedException("You are not authorized to read this package.");
  }

  return new ApiResponse({
    message: "Package retrieved.",
    statusCode: StatusCodes.OK,
    data: cateringPackage,
    fieldName: "package",
  });
};

export const create = async ({ req }: AuthenticatedControllerParams) => {
  const ability = new PackageAbilityBuilder(req.session).getAbility();

  if (!ability.can(AbilityAction.CREATE, new PackageAuthZEntity({ tenantId: req.body.tenantId }))) {
    throw new UnauthorizedException("You are not authorized to create a package for this tenant.");
  }

  const cateringPackage = await packageService.create({ payload: req.body });

  return new ApiResponse({
    message: "Package created.",
    statusCode: StatusCodes.CREATED,
    data: cateringPackage,
    fieldName: "package",
  });
};

export const update = async ({ req }: AuthenticatedControllerParams) => {
  const ability = new PackageAbilityBuilder(req.session).getAbility();

  const { id, ...payload } = req.body;

  const existing = await packageService.getOne({ query: { _id: id } });

  if (!ability.can(AbilityAction.UPDATE, new PackageAuthZEntity({ tenantId: existing.tenantId?.toString() }))) {
    throw new UnauthorizedException("You are not authorized to update this package.");
  }

  const cateringPackage = await packageService.update({
    query: { _id: id },
    payload,
  });

  return new ApiResponse({
    message: "Package updated.",
    statusCode: StatusCodes.OK,
    data: cateringPackage,
    fieldName: "package",
  });
};

export const remove = async ({ req }: AuthenticatedControllerParams) => {
  const ability = new PackageAbilityBuilder(req.session).getAbility();

  const existing = await packageService.getOne({ query: { _id: req.params.id } });

  if (!ability.can(AbilityAction.HARD_DELETE, new PackageAuthZEntity({ tenantId: existing.tenantId?.toString() }))) {
    throw new UnauthorizedException("You are not authorized to delete this package.");
  }

  await packageService.hardDelete({ query: { _id: req.params.id } });

  return new ApiResponse({
    message: "Package deleted.",
    statusCode: StatusCodes.OK,
    data: null,
    fieldName: "package",
  });
};

// --- Public storefront endpoint (no authentication) ---

export const listPublicByTenantSlug = async ({ req }: ControllerParams) => {
  // Resolve the tenant by its public slug (throws 404 when missing/inactive).
  const tenant = await tenantService.getOne({
    query: { slug: req.params.slug, status: TENANT_STATUS_ENUMS.ACTIVE },
  });

  const filter = new MongoQuery(req.query, { searchFields: ["name", "description"] }).build();

  const finalQuery = {
    $and: [filter.getFilterQuery(), { tenantId: tenant._id, status: PACKAGE_STATUS_ENUM.ACTIVE }],
  };

  const results = await packageService.list({
    query: finalQuery,
    options: filter.getQueryOptions(),
  });

  const { data, pagination } = formatListResponse(results);

  return new ApiResponse({
    message: "Packages retrieved",
    statusCode: StatusCodes.OK,
    data,
    fieldName: "packages",
    pagination,
  });
};
