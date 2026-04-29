import type { AbilityClass, AbilityTuple, AnyAbility, MongoQuery } from "@casl/ability";
import { AbilityBuilder, buildMongoQueryMatcher, PureAbility } from "@casl/ability";
import type { IAbilityBuilder, ISession } from "@catering/types";
import { AbilityAction, USER_ROLE_ENUM } from "@catering/types";

type ProductionRequirementAuthZEntityProps = {
  tenantId?: string | null;
};

export class ProductionRequirementAuthZEntity {
  public readonly tenantId: string | undefined;
  constructor({ tenantId }: ProductionRequirementAuthZEntityProps) {
    this.tenantId = tenantId ?? undefined;
  }
}

type ClaimAbility = PureAbility<AbilityTuple, MongoQuery<typeof ProductionRequirementAuthZEntity>>;

const ClaimAbility = PureAbility as AbilityClass<ClaimAbility>;

export class ProductionRequirementAbilityBuilder implements IAbilityBuilder {
  private abilityBuilder: AbilityBuilder<ClaimAbility>;
  private session: ISession;

  constructor(session: ISession) {
    this.abilityBuilder = new AbilityBuilder(ClaimAbility);
    this.session = session;
  }

  getAbility(): AnyAbility {
    const builder = this.abilityBuilder;

    if (this.session.user.role === USER_ROLE_ENUM.PLATFORM_ADMIN) {
      builder.can(AbilityAction.MANAGE, ProductionRequirementAuthZEntity);
    }

    if (this.session.user.role === USER_ROLE_ENUM.CATERING_ADMIN) {
      builder.can(AbilityAction.MANAGE, ProductionRequirementAuthZEntity, { tenantId: this.session.tenantId });
    }

    return builder.build({
      conditionsMatcher: buildMongoQueryMatcher(),
    });
  }
}
