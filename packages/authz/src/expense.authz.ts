import type { AbilityClass, AbilityTuple, AnyAbility, MongoQuery } from "@casl/ability";
import { AbilityBuilder, buildMongoQueryMatcher, PureAbility } from "@casl/ability";
import type { IAbilityBuilder, ISession } from "@catering/types";
import { AbilityAction, ACCOUNT_TYPE_ENUMS, USER_ROLE_ENUM } from "@catering/types";

type ExpenseAuthZEntityProps = {
  tenantId?: string | null;
};

export class ExpenseAuthZEntity {
  public readonly tenantId: string | undefined;
  constructor({ tenantId }: ExpenseAuthZEntityProps) {
    this.tenantId = tenantId ?? undefined;
  }
}

type ClaimAbility = PureAbility<AbilityTuple, MongoQuery<typeof ExpenseAuthZEntity>>;

const ClaimAbility = PureAbility as AbilityClass<ClaimAbility>;

export class ExpenseAbilityBuilder implements IAbilityBuilder {
  private abilityBuilder: AbilityBuilder<ClaimAbility>;
  private session: ISession;

  constructor(session: ISession) {
    this.abilityBuilder = new AbilityBuilder(ClaimAbility);
    this.session = session;
  }

  getAbility(): AnyAbility {
    const builder = this.abilityBuilder;

    if (this.session.user.type === ACCOUNT_TYPE_ENUMS.ADMIN) {
      builder.can(AbilityAction.MANAGE, ExpenseAuthZEntity);
    }

    if (this.session.user.type === ACCOUNT_TYPE_ENUMS.CATERER) {
      builder.can(AbilityAction.MANAGE, ExpenseAuthZEntity, { tenantId: this.session.tenantId });
    }

    return builder.build({
      conditionsMatcher: buildMongoQueryMatcher(),
    });
  }
}
