import type { AbilityClass, AbilityTuple, AnyAbility, MongoQuery } from "@casl/ability";
import { AbilityBuilder, buildMongoQueryMatcher, PureAbility } from "@casl/ability";
import type { IAbilityBuilder, ISession } from "@catering/types";
import { AbilityAction, USER_ROLE_ENUM } from "@catering/types";

type OrderAuthZEntityProps = {
  userId?: string | null;
  tenantId?: string | null;
};

export class OrderAuthZEntity {
  public readonly userId: string | null;
  public readonly tenantId: string | undefined;
  constructor({ userId, tenantId }: OrderAuthZEntityProps) {
    this.userId = userId ?? null;
    this.tenantId = tenantId ?? undefined;
  }
}

type ClaimAbility = PureAbility<AbilityTuple, MongoQuery<typeof OrderAuthZEntity>>;

const ClaimAbility = PureAbility as AbilityClass<ClaimAbility>;

export class OrderAbilityBuilder implements IAbilityBuilder {
  private abilityBuilder: AbilityBuilder<ClaimAbility>;
  private session: ISession;

  constructor(session: ISession) {
    this.abilityBuilder = new AbilityBuilder(ClaimAbility);
    this.session = session;
  }

  getAbility(): AnyAbility {
    const builder = this.abilityBuilder;

    if (this.session.user.role === USER_ROLE_ENUM.PLATFORM_ADMIN) {
      builder.can(AbilityAction.MANAGE, OrderAuthZEntity);
    }

    if (this.session.user.role === USER_ROLE_ENUM.CATERING_ADMIN) {
      builder.can(AbilityAction.MANAGE, OrderAuthZEntity, { tenantId: this.session.tenantId });
    }

    if (this.session.user.role === USER_ROLE_ENUM.CUSTOMER) {
      builder.can(AbilityAction.READ, OrderAuthZEntity, { userId: this.session.user.id });
    }

    return builder.build({
      conditionsMatcher: buildMongoQueryMatcher(),
    });
  }
}
