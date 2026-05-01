import { accessibleBy } from "@casl/mongoose";
import { type UserAbilityBuilder, UserAuthZEntity } from "@catering/authz";
import { AbilityAction } from "@catering/types";
import _ from "lodash";
import type { PipelineStage } from "mongoose";
import { projectQuery } from "../../../common/query";
import { type IUserDoc, User } from "../../../models";

export const roleScopedSecurityQuery = (ability: ReturnType<UserAbilityBuilder["getAbility"]>) => {
  const query = accessibleBy(ability, AbilityAction.Read).ofType(UserAuthZEntity);
  return query;
};

export const excludeDeletedQuery = (): PipelineStage[] => {
  return [
    {
      $match: {
        "deleteMarker.status": {
          $ne: true,
        },
      },
    },
  ];
};

export const userProjectionQuery = (): PipelineStage[] => {
  const fieldsToExclude: (keyof IUserDoc | "__v")[] = ["__v" as keyof IUserDoc];
  const selectedFields = Object.keys(_.omit(User.schema.paths, fieldsToExclude));

  return projectQuery(selectedFields);
};
