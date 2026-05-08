"use client";

import type { AbilityClass, AnyAbility } from "@casl/ability";
import { AbilityBuilder, PureAbility } from "@casl/ability";
import { createContextualCan } from "@casl/react";
import { AbilityAction } from "@catering/types";
import { createContext, useContext } from "react";

type ClaimAbility = PureAbility<[AbilityAction.MANAGE, "all"]>;
const ClaimAbility = PureAbility as AbilityClass<ClaimAbility>;

export const ability = new AbilityBuilder(ClaimAbility);
ability.cannot(AbilityAction.MANAGE, "all");

export const AbilityContext = createContext<AnyAbility>(ability.build());
export const Can = createContextualCan(AbilityContext.Consumer);

export const useAbility = () => {
  return useContext(AbilityContext);
};
