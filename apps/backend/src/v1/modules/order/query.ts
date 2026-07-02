import { accessibleBy } from "@casl/mongoose";
import { type OrderAbilityBuilder, OrderAuthZEntity } from "@catering/authz";
import { AbilityAction } from "@catering/types";
import _ from "lodash";
import type { PipelineStage } from "mongoose";
import { projectQuery } from "../../../common/query";
import { Order } from "../../../models";
import { modelNames } from "../../../models/constants";
import type { IOrderDoc } from "../../../models/order";

export const roleScopedSecurityQuery = (ability: ReturnType<OrderAbilityBuilder["getAbility"]>) => {
  return accessibleBy(ability, AbilityAction.READ).ofType(OrderAuthZEntity);
};

export const orderProjectionQuery = (): PipelineStage[] => {
  const fieldsToExclude: (keyof IOrderDoc | "__v")[] = ["__v" as keyof IOrderDoc];
  const selectedFields = Object.keys(_.omit(Order.schema.paths, fieldsToExclude));

  return projectQuery(selectedFields);
};

/**
 * Attach the parent tenant's public `slug` and `name` to each order. The
 * customer portal uses the slug to re-open the caterer's storefront when a
 * customer chooses to reorder. Run after {@link orderProjectionQuery}, whose
 * projection would otherwise drop these derived fields.
 */
export const tenantInfoLookup = (): PipelineStage[] => [
  {
    $lookup: {
      from: modelNames.TENANT,
      localField: "tenantId",
      foreignField: "_id",
      as: "__tenant",
    },
  },
  {
    $addFields: {
      tenantSlug: { $ifNull: [{ $arrayElemAt: ["$__tenant.slug", 0] }, null] },
      tenantName: { $ifNull: [{ $arrayElemAt: ["$__tenant.name", 0] }, null] },
    },
  },
  { $project: { __tenant: 0 } },
];
