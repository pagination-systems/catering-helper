import type { AbilityClass, AbilityTuple, AnyAbility, MongoQuery } from "@casl/ability";
import { AbilityBuilder, buildMongoQueryMatcher, PureAbility } from "@casl/ability";
import type { IAbilityBuilder, ISession } from "@catering/types";
import { AbilityAction, ACCOUNT_TYPE_ENUMS } from "@catering/types";

type TaskAuthZEntityProps = {
  id?: string | null;
  tenantId?: string | null;
  assignedTo?: string | null;
  createdBy?: string | null;
};

export class TaskAuthZEntity {
  public readonly _id: string | null;
  public readonly tenantId: string | undefined;
  public readonly assignedTo: string | null;
  public readonly createdBy: string | null;

  constructor({ id, tenantId, assignedTo, createdBy }: TaskAuthZEntityProps) {
    this._id = id ?? null;
    this.tenantId = tenantId ?? undefined;
    this.assignedTo = assignedTo ?? null;
    this.createdBy = createdBy ?? null;
  }
}

type ClaimAbility = PureAbility<AbilityTuple, MongoQuery<typeof TaskAuthZEntity>>;

const ClaimAbility = PureAbility as AbilityClass<ClaimAbility>;

export class TaskAbilityBuilder implements IAbilityBuilder {
  private abilityBuilder: AbilityBuilder<ClaimAbility>;
  private session: ISession;

  constructor(session: ISession) {
    this.abilityBuilder = new AbilityBuilder(ClaimAbility);
    this.session = session;
  }

  getAbility(): AnyAbility {
    const builder = this.abilityBuilder;

    if (this.session.user.type === ACCOUNT_TYPE_ENUMS.ADMIN) {
      builder.can(AbilityAction.MANAGE, TaskAuthZEntity);
    }

    if (this.session.user.type === ACCOUNT_TYPE_ENUMS.CATERER) {
      builder.can(AbilityAction.MANAGE, TaskAuthZEntity, { tenantId: this.session.tenantId });
    }

    if (this.session.user.type === ACCOUNT_TYPE_ENUMS.CUSTOMER) {
      builder.can(AbilityAction.READ, TaskAuthZEntity, { assignedTo: this.session.user.id });
      builder.can(AbilityAction.UPDATE, TaskAuthZEntity, { assignedTo: this.session.user.id });
    }

    return builder.build({
      conditionsMatcher: buildMongoQueryMatcher(),
    });
  }
}
