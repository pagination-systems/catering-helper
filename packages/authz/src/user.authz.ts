import {
  AbilityBuilder,
  AbilityClass,
  AbilityTuple,
  AnyAbility,
  PureAbility,
  buildMongoQueryMatcher,
  MongoQuery,
  fieldPatternMatcher,
} from "@casl/ability";

import {
  ACCOUNT_TYPE_ENUMS,
  USER_ROLE_ENUMS,
  ISession,
  IAbilityBuilder,
  AbilityAction,
} from "@catering/types";

// --- 2. AUTHZ ENTITY ---
export class UserAuthZEntity {
  public readonly tenantId: string | null;
  public readonly _id: string | null;
  public readonly type?: ACCOUNT_TYPE_ENUMS;

  constructor({
    tenantId,
    _id,
    type,
  }: {
    tenantId?: string | null;
    _id?: string | null;
    type?: ACCOUNT_TYPE_ENUMS;
  }) {
    this.tenantId = tenantId ?? null;
    this._id = _id ?? null;
    this.type = type ?? undefined;
  }
}

type ClaimAbility = PureAbility<
  AbilityTuple,
  MongoQuery<typeof UserAuthZEntity>
>;
const ClaimAbility = PureAbility as AbilityClass<ClaimAbility>;

// --- 3. ABILITY BUILDER ---
export class UserAbilityBuilder implements IAbilityBuilder {
  private abilityBuilder: AbilityBuilder<ClaimAbility>;
  private session: ISession;

  constructor(session: ISession) {
    this.abilityBuilder = new AbilityBuilder(ClaimAbility);
    this.session = session;
  }

  getAbility(): AnyAbility {
    // Destructuring for cleaner, shorter rule definitions
    const { can } = this.abilityBuilder;
    const { user, tenantId } = this.session;

    return this.buildAbility();
  }

  // Extracted to keep the main logic block clean
  private buildAbility(): AnyAbility {
    return this.abilityBuilder.build({
      conditionsMatcher: buildMongoQueryMatcher(),
      fieldMatcher: fieldPatternMatcher,
    });
  }
}
