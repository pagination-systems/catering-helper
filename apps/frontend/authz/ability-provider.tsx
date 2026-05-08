"use client";

import { buildMongoQueryMatcher, fieldPatternMatcher, PureAbility } from "@casl/ability";
import {
  CustomerLedgerAbilityBuilder,
  ExpenseAbilityBuilder,
  OrderAbilityBuilder,
  PackageAbilityBuilder,
  ProductionRequirementAbilityBuilder,
  TenantAbilityBuilder,
  UserAbilityBuilder,
} from "@catering/authz";
import { useMemo } from "react";
import { AbilityContext, ability } from "./ability-context";
import { useSession } from "./use-session";

export const AbilityProvider = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  const abilityInstance = useMemo(() => {
    if (!session) return ability.build();

    const userAbility = new UserAbilityBuilder(session);
    const tenantAbility = new TenantAbilityBuilder(session);
    const packageAbility = new PackageAbilityBuilder(session);
    const orderAbility = new OrderAbilityBuilder(session);
    const expenseAbility = new ExpenseAbilityBuilder(session);
    const customerLedgerAbility = new CustomerLedgerAbilityBuilder(session);
    const productionRequirementAbility = new ProductionRequirementAbilityBuilder(session);

    const appRules = [
      ...userAbility.getAbility().rules,
      ...tenantAbility.getAbility().rules,
      ...packageAbility.getAbility().rules,
      ...orderAbility.getAbility().rules,
      ...expenseAbility.getAbility().rules,
      ...customerLedgerAbility.getAbility().rules,
      ...productionRequirementAbility.getAbility().rules,
    ];

    return new PureAbility(appRules, {
      conditionsMatcher: buildMongoQueryMatcher(),
      fieldMatcher: fieldPatternMatcher,
    });
  }, [session]);

  return <AbilityContext.Provider value={abilityInstance}>{children}</AbilityContext.Provider>;
};
