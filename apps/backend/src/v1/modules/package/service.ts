/* eslint-disable @typescript-eslint/no-explicit-any */

import { Types } from "mongoose";
import { NotFoundException } from "../../../common/helper";
import { sanitizeQueryIds } from "../../../common/helper/sanitizeQueryIds";
import { excludeDeletedQuery, matchQuery } from "../../../common/query";
import { Package } from "../../../models";
import type { IDayPlan } from "../../../models/package";
import type { IListPackageParams, IPackageCreateParams, IPackageGetParams, IPackageUpdateParams } from "./interface";
import { packageProjectionQuery } from "./query";

/**
 * Guarantees every embedded variant carries a stable `id`. The frontend supplies
 * ids for existing variants; new ones may arrive without an id, so we mint one.
 */
const normalizeDays = (days: IDayPlan[]): IDayPlan[] =>
  days.map((day) => ({
    day: day.day,
    variants: (day.variants ?? []).map((variant) => ({
      ...variant,
      id: variant.id || new Types.ObjectId().toString(),
      available: variant.available ?? true,
    })),
  }));

export const list = ({ query = {}, options, session }: IListPackageParams) => {
  const aggregate = Package.aggregate([
    ...matchQuery(sanitizeQueryIds(query)),
    ...excludeDeletedQuery(),
    ...packageProjectionQuery(),
  ]);

  if (session) aggregate.session(session);

  return Package.aggregatePaginate(aggregate, options);
};

export const getOne = async ({ query = {}, session }: IPackageGetParams) => {
  const aggregate = Package.aggregate([
    ...matchQuery(sanitizeQueryIds(query)),
    ...excludeDeletedQuery(),
    ...packageProjectionQuery(),
  ]);

  if (session) aggregate.session(session);

  const packages = await aggregate;

  if (packages.length === 0) throw new NotFoundException("Package not found.");
  return packages[0];
};

export const create = async ({ payload, session }: IPackageCreateParams) => {
  const cateringPackage = new Package({
    ...payload,
    days: normalizeDays(payload.days ?? []),
  });
  const saved = await cateringPackage.save({ session });

  return getOne({
    query: { _id: saved._id } as any,
    session,
  });
};

export const update = async ({ query, payload, session }: IPackageUpdateParams) => {
  const sanitizedQuery = sanitizeQueryIds(query);
  const existing = await getOne({ query: sanitizedQuery, session });

  const updatePayload: Record<string, any> = { ...payload };
  // tenantId is immutable once a package is created.
  delete updatePayload.tenantId;
  if (updatePayload.days) {
    updatePayload.days = normalizeDays(updatePayload.days as IDayPlan[]);
  }

  const updated = await Package.findOneAndUpdate(
    { _id: existing._id },
    { $set: updatePayload },
    { new: true, session },
  );

  if (!updated) throw new NotFoundException("Package not found.");

  return getOne({ query: { _id: updated._id } as any, session });
};

export const hardDelete = async ({ query, session }: IPackageGetParams) => {
  const sanitizedQuery = sanitizeQueryIds(query);
  const cateringPackage = await getOne({ query: sanitizedQuery, session });

  const deleted = await Package.findOneAndDelete({ _id: cateringPackage._id }, { session });
  if (!deleted) throw new NotFoundException("Package not found to delete.");

  return cateringPackage;
};
