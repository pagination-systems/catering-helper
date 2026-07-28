/* eslint-disable @typescript-eslint/no-explicit-any */

import { ACCOUNT_TYPE_ENUMS, USER_ROLE_ENUMS } from "@catering/types";
import { BadRequestException, NotFoundException } from "../../../common/helper";
import { sanitizeQueryIds } from "../../../common/helper/sanitizeQueryIds";
import { excludeDeletedQuery, matchQuery } from "../../../common/query";
import { Tenant } from "../../../models";
import { EMAIL_VERIFICATION_STATUS_ENUMS } from "../../../models/constants";
import * as userService from "../user";
import type { IListTenantParams, IOnboardCatererParams, ITenantCreateParams, ITenantGetParams } from "./interface";
import { tenantProjectionQuery } from "./query";

export const list = ({ query = {}, options, session }: IListTenantParams) => {
  const aggregate = Tenant.aggregate([
    ...matchQuery(sanitizeQueryIds(query)),
    ...excludeDeletedQuery(),
    ...tenantProjectionQuery(),
  ]);

  if (session) aggregate.session(session);

  return Tenant.aggregatePaginate(aggregate, options);
};

export const getOne = async ({ query = {}, session }: ITenantGetParams) => {
  const aggregate = Tenant.aggregate([
    ...matchQuery(sanitizeQueryIds(query)),
    ...excludeDeletedQuery(),
    ...tenantProjectionQuery(),
  ]);

  if (session) aggregate.session(session);

  const tenants = await aggregate;

  if (tenants.length === 0) throw new NotFoundException("Tenant not found.");
  return tenants[0];
};

export const create = async ({ payload, session }: ITenantCreateParams) => {
  let tenant = new Tenant(payload);
  tenant = await tenant.save({ session });

  return getOne({
    query: { _id: tenant._id } as any,
    session,
  });
};

/**
 * Provisions a new caterer: creates the tenant and its owner login account
 * (an `admin`-provisioned `CATERER` user scoped to the tenant, pre-verified so
 * they can sign in immediately).
 *
 * Standalone MongoDB has no multi-document transactions, so the tenant is
 * rolled back manually if creating the owner account fails.
 */
export const onboardCaterer = async ({ payload, owner }: IOnboardCatererParams) => {
  // Fail fast (before creating anything) if the owner email is already taken.
  const existingUser = await userService.getUserByEmail(owner.email);
  if (existingUser) throw new BadRequestException("A user with this email already exists.");

  const tenant = await new Tenant(payload).save();

  try {
    const ownerUser = await userService.create({
      payload: {
        firstName: owner.firstName,
        lastName: owner.lastName,
        email: owner.email,
        password: owner.password,
        type: ACCOUNT_TYPE_ENUMS.CATERER,
        role: USER_ROLE_ENUMS.TENANT_ADMIN,
        tenantId: tenant._id as any,
      },
    });

    // Admin-provisioned accounts skip email verification.
    await userService.update({
      query: { _id: ownerUser._id } as any,
      payload: { emailVerificationStatus: EMAIL_VERIFICATION_STATUS_ENUMS.VERIFIED },
    });
  } catch (error) {
    await Tenant.findByIdAndDelete(tenant._id);
    throw error;
  }

  return getOne({ query: { _id: tenant._id } as any });
};
