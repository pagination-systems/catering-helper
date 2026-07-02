import { accessibleBy } from "@casl/mongoose";
import { type OrderAbilityBuilder, OrderAuthZEntity } from "@catering/authz";
import { AbilityAction } from "@catering/types";
import _ from "lodash";
import type { PipelineStage } from "mongoose";
import { projectQuery } from "../../../common/query";
import { Order } from "../../../models";
import type { IOrderDoc } from "../../../models/order";

export const roleScopedSecurityQuery = (ability: ReturnType<OrderAbilityBuilder["getAbility"]>) => {
  return accessibleBy(ability, AbilityAction.READ).ofType(OrderAuthZEntity);
};

export const orderProjectionQuery = (): PipelineStage[] => {
  const fieldsToExclude: (keyof IOrderDoc | "__v")[] = ["__v" as keyof IOrderDoc];
  const selectedFields = Object.keys(_.omit(Order.schema.paths, fieldsToExclude));

  return projectQuery(selectedFields);
};
