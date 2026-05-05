import type { AbilityClass, AbilityTuple, AnyAbility, MongoQuery } from "@casl/ability";
import { AbilityBuilder, buildMongoQueryMatcher, PureAbility } from "@casl/ability";
import type { IAbilityBuilder, ISession } from "@catering/types";
import { AbilityAction, ACCOUNT_TYPE_ENUMS } from "@catering/types";

type TenantAuthZEntityProps = {
  id?: string | null;
};

export class TenantAuthZEntity {
  public readonly _id: string | undefined;
  constructor({ id }: TenantAuthZEntityProps) {
    this._id = id ?? undefined;
  }
}

type ClaimAbility = PureAbility<AbilityTuple, MongoQuery<typeof TenantAuthZEntity>>;

const ClaimAbility = PureAbility as AbilityClass<ClaimAbility>;

export class TenantAbilityBuilder implements IAbilityBuilder {
  private abilityBuilder: AbilityBuilder<ClaimAbility>;
  private session: ISession;

  constructor(session: ISession) {
    this.abilityBuilder = new AbilityBuilder(ClaimAbility);
    this.session = session;
  }

  getAbility(): AnyAbility {
    const builder = this.abilityBuilder;

    if (this.session.user.type === ACCOUNT_TYPE_ENUMS.ADMIN) {
      builder.can(AbilityAction.MANAGE, TenantAuthZEntity);
    }

    if (this.session.user.type === ACCOUNT_TYPE_ENUMS.CATERER) {
      builder.can(AbilityAction.MANAGE, TenantAuthZEntity, { _id: this.session.tenantId });
    }

    return builder.build({
      conditionsMatcher: buildMongoQueryMatcher(),
    });
  }
}
