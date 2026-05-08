import type { AbilityClass, AbilityTuple, AnyAbility, MongoQuery } from "@casl/ability";
import { AbilityBuilder, buildMongoQueryMatcher, PureAbility } from "@casl/ability";
import type { IAbilityBuilder, ISession } from "@catering/types";
import { AbilityAction, ACCOUNT_TYPE_ENUMS } from "@catering/types";

type UserAuthZEntityProps = {
  id?: string | null;
  type?: ACCOUNT_TYPE_ENUMS;
};

export class UserAuthZEntity {
  public readonly _id: string | null;
  public readonly type: ACCOUNT_TYPE_ENUMS | undefined;
  constructor({ id, type }: UserAuthZEntityProps) {
    this._id = id ?? null;
    this.type = type;
  }
}

type ClaimAbility = PureAbility<AbilityTuple, MongoQuery<typeof UserAuthZEntity>>;

const ClaimAbility = PureAbility as AbilityClass<ClaimAbility>;

export class UserAbilityBuilder implements IAbilityBuilder {
  private abilityBuilder: AbilityBuilder<ClaimAbility>;
  private session: ISession;

  constructor(session: ISession) {
    this.abilityBuilder = new AbilityBuilder(ClaimAbility);
    this.session = session;
  }

  getAbility(): AnyAbility {
    const builder = this.abilityBuilder;

    if (this.session.user.type === ACCOUNT_TYPE_ENUMS.ADMIN) {
      builder.can(AbilityAction.MANAGE, UserAuthZEntity);
    }

    if (this.session.user.type === ACCOUNT_TYPE_ENUMS.CATERER) {
      builder.can(AbilityAction.READ, UserAuthZEntity, { _id: this.session.user.id });
      builder.can(AbilityAction.UPDATE, UserAuthZEntity, { _id: this.session.user.id });
    }

    if (this.session.user.type === ACCOUNT_TYPE_ENUMS.CUSTOMER) {
      builder.can(AbilityAction.READ, UserAuthZEntity, { _id: this.session.user.id });
      builder.can(AbilityAction.UPDATE, UserAuthZEntity, { _id: this.session.user.id });
    }

    return builder.build({
      conditionsMatcher: buildMongoQueryMatcher(),
    });
  }
}
