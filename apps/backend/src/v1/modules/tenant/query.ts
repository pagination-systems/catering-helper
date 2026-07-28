import { accessibleBy } from "@casl/mongoose";
import { type TenantAbilityBuilder, TenantAuthZEntity } from "@catering/authz";
import { AbilityAction } from "@catering/types";
import _ from "lodash";
import type { PipelineStage } from "mongoose";
import { projectQuery } from "../../../common/query";
import { Tenant } from "../../../models";
import type { ITenantDoc } from "../../../models/tenant";

export const roleScopedSecurityQuery = (ability: ReturnType<TenantAbilityBuilder["getAbility"]>) => {
  return accessibleBy(ability, AbilityAction.READ).ofType(TenantAuthZEntity);
};

export const tenantProjectionQuery = (): PipelineStage[] => {
  const fieldsToExclude: (keyof ITenantDoc | "__v")[] = ["__v" as keyof ITenantDoc];
  const selectedFields = Object.keys(_.omit(Tenant.schema.paths, fieldsToExclude));

  return projectQuery(selectedFields);
};
