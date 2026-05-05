import type { AbilityClass, AbilityTuple, AnyAbility, MongoQuery } from "@casl/ability";
import { AbilityBuilder, buildMongoQueryMatcher, PureAbility } from "@casl/ability";
import type { IAbilityBuilder, ISession } from "@catering/types";
import { AbilityAction, ACCOUNT_TYPE_ENUMS, USER_ROLE_ENUM } from "@catering/types";

type PackageAuthZEntityProps = {
  tenantId?: string | null;
};

export class PackageAuthZEntity {
  public readonly tenantId: string | undefined;
  constructor({ tenantId }: PackageAuthZEntityProps) {
    this.tenantId = tenantId ?? undefined;
  }
}

type ClaimAbility = PureAbility<AbilityTuple, MongoQuery<typeof PackageAuthZEntity>>;

const ClaimAbility = PureAbility as AbilityClass<ClaimAbility>;

export class PackageAbilityBuilder implements IAbilityBuilder {
  private abilityBuilder: AbilityBuilder<ClaimAbility>;
  private session: ISession;

  constructor(session: ISession) {
    this.abilityBuilder = new AbilityBuilder(ClaimAbility);
    this.session = session;
  }

  getAbility(): AnyAbility {
    const builder = this.abilityBuilder;

    if (this.session.user.type === ACCOUNT_TYPE_ENUMS.ADMIN) {
      builder.can(AbilityAction.MANAGE, PackageAuthZEntity);
    }

    if (this.session.user.type === ACCOUNT_TYPE_ENUMS.CATERER) {
      builder.can(AbilityAction.MANAGE, PackageAuthZEntity, { tenantId: this.session.tenantId });
    }

    if (this.session.user.type === ACCOUNT_TYPE_ENUMS.CUSTOMER) {
      builder.can(AbilityAction.READ, PackageAuthZEntity);
    }

    return builder.build({
      conditionsMatcher: buildMongoQueryMatcher(),
    });
  }
}
