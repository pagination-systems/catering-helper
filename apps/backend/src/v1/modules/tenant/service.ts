/* eslint-disable @typescript-eslint/no-explicit-any */

import { NotFoundException } from "../../../common/helper";
import { sanitizeQueryIds } from "../../../common/helper/sanitizeQueryIds";
import { excludeDeletedQuery, matchQuery } from "../../../common/query";
import { Tenant } from "../../../models";
import type { IListTenantParams, ITenantCreateParams, ITenantGetParams } from "./interface";
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
