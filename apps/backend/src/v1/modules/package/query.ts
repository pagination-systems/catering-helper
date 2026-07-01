import { accessibleBy } from "@casl/mongoose";
import { type PackageAbilityBuilder, PackageAuthZEntity } from "@catering/authz";
import { AbilityAction } from "@catering/types";
import _ from "lodash";
import type { PipelineStage } from "mongoose";
import { projectQuery } from "../../../common/query";
import { Package } from "../../../models";
import type { IPackageDoc } from "../../../models/package";

export const roleScopedSecurityQuery = (ability: ReturnType<PackageAbilityBuilder["getAbility"]>) => {
  return accessibleBy(ability, AbilityAction.READ).ofType(PackageAuthZEntity);
};

export const packageProjectionQuery = (): PipelineStage[] => {
  const fieldsToExclude: (keyof IPackageDoc | "__v")[] = ["__v" as keyof IPackageDoc];
  const selectedFields = Object.keys(_.omit(Package.schema.paths, fieldsToExclude));

  return projectQuery(selectedFields);
};
