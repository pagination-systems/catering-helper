import type { AnyAbility } from "@casl/ability";

export interface IAbilityBuilder {
  getAbility(): AnyAbility;
}
