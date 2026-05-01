import {
  AbilityBuilder,
  type AbilityClass,
  type AbilityTuple,
  type AnyAbility,
  buildMongoQueryMatcher,
  fieldPatternMatcher,
  type MongoQuery,
  PureAbility,
} from "@casl/ability";

import {
  AbilityAction,
  type ACCOUNT_TYPE_ENUMS,
  type IAbilityBuilder,
  type ISession,
  USER_ROLE_ENUMS,
} from "@catering/types";

// --- 1. FIELD DEFINITIONS ---
export const ALL_USER_FIELDS = [
  "_id",
  "id",
  "firstName",
  "lastName",
  "fullName",
  "email",
  "profileImageId",
  "type",
  "emailVerificationStatus",
  "role",
  "createdAt",
  "updatedAt",
  "tenantId",
  "jobProfileId",
  "password",
  "isDeleted",
  "deletedAt",
  "kycStatus",
];

// Helper to clean up array filtering
const omitFields = (fieldsToOmit: string[]) => ALL_USER_FIELDS.filter((field) => !fieldsToOmit.includes(field));

// Baseline Fields (Self)
const SELF_UPDATE_FIELDS = omitFields([
  "_id",
  "id",
  "email",
  "profileImageId",
  "emailVerificationStatus",
  "createdAt",
  "updatedAt",
  "tenantId",
  "jobProfileId",
  "isDeleted",
  "deletedAt",
  "type",
  "role",
  "kycStatus",
]);

const SELF_READ_FIELDS_CANDIDATE = omitFields(["password", "tenantId", "isDeleted", "deletedAt", "role"]);

const SELF_READ_FIELDS_EMPLOYER = omitFields(["password", "tenantId", "isDeleted", "deletedAt"]);

// Public / Cross-Role Viewing Fields
const PUBLIC_CANDIDATE_FIELDS = omitFields(["role", "tenantId", "password", "isDeleted", "deletedAt"]);
const PUBLIC_EMPLOYER_FIELDS = omitFields(["role", "jobProfileId", "password", "isDeleted", "deletedAt"]);

// Tenant Admin Fields
const TENANT_ADMIN_READ_FIELDS = omitFields(["password"]);
const TENANT_ADMIN_UPDATE_FIELDS = omitFields(["password", "tenantId", "type", "isDeleted", "deletedAt"]);

// Platform Admin Fields
const PLATFORM_ADMIN_FIELDS = omitFields(["password"]);

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

type ClaimAbility = PureAbility<AbilityTuple, MongoQuery<typeof UserAuthZEntity>>;
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
