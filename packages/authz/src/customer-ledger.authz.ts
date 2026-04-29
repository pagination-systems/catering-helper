import type { AbilityClass, AbilityTuple, AnyAbility, MongoQuery } from "@casl/ability";
import { AbilityBuilder, buildMongoQueryMatcher, PureAbility } from "@casl/ability";
import type { IAbilityBuilder, ISession } from "@catering/types";
import { AbilityAction, USER_ROLE_ENUM } from "@catering/types";

type CustomerLedgerAuthZEntityProps = {
  tenantId?: string | null;
};

export class CustomerLedgerAuthZEntity {
  public readonly tenantId: string | undefined;
  constructor({ tenantId }: CustomerLedgerAuthZEntityProps) {
    this.tenantId = tenantId ?? undefined;
  }
}

type ClaimAbility = PureAbility<AbilityTuple, MongoQuery<typeof CustomerLedgerAuthZEntity>>;

const ClaimAbility = PureAbility as AbilityClass<ClaimAbility>;

export class CustomerLedgerAbilityBuilder implements IAbilityBuilder {
  private abilityBuilder: AbilityBuilder<ClaimAbility>;
  private session: ISession;

  constructor(session: ISession) {
    this.abilityBuilder = new AbilityBuilder(ClaimAbility);
    this.session = session;
  }

  getAbility(): AnyAbility {
    const builder = this.abilityBuilder;

    if (this.session.user.role === USER_ROLE_ENUM.PLATFORM_ADMIN) {
      builder.can(AbilityAction.MANAGE, CustomerLedgerAuthZEntity);
    }

    if (this.session.user.role === USER_ROLE_ENUM.CATERING_ADMIN) {
      builder.can(AbilityAction.MANAGE, CustomerLedgerAuthZEntity, { tenantId: this.session.tenantId });
    }

    if (this.session.user.role === USER_ROLE_ENUM.CUSTOMER) {
      builder.can(AbilityAction.READ, CustomerLedgerAuthZEntity);
    }

    return builder.build({
      conditionsMatcher: buildMongoQueryMatcher(),
    });
  }
}
