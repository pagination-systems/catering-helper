import type { AbilityClass, AbilityTuple, AnyAbility, MongoQuery } from "@casl/ability";
import { AbilityBuilder, buildMongoQueryMatcher, PureAbility } from "@casl/ability";
import type { IAbilityBuilder, ISession } from "@catering/types";
import { AbilityAction, USER_ROLE_ENUM } from "@catering/types";

type UserAuthZEntityProps = {
  id?: string | null;
  role?: USER_ROLE_ENUM;
};

export class UserAuthZEntity {
  public readonly _id: string | null;
  public readonly role: USER_ROLE_ENUM | undefined;
  constructor({ id, role }: UserAuthZEntityProps) {
    this._id = id ?? null;
    this.role = role;
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

    if (this.session.user.role === USER_ROLE_ENUM.PLATFORM_ADMIN) {
      builder.can(AbilityAction.MANAGE, UserAuthZEntity);
    }

    if (this.session.user.role === USER_ROLE_ENUM.CATERING_ADMIN) {
      builder.can(AbilityAction.READ, UserAuthZEntity, { _id: this.session.user.id });
      builder.can(AbilityAction.UPDATE, UserAuthZEntity, { _id: this.session.user.id });
    }

    if (this.session.user.role === USER_ROLE_ENUM.CUSTOMER) {
      builder.can(AbilityAction.READ, UserAuthZEntity, { _id: this.session.user.id });
      builder.can(AbilityAction.UPDATE, UserAuthZEntity, { _id: this.session.user.id });
    }

    return builder.build({
      conditionsMatcher: buildMongoQueryMatcher(),
    });
  }
}
