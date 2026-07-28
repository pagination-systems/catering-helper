import { OrderAbilityBuilder, OrderAuthZEntity } from "@catering/authz";
import { AbilityAction, ORDER_SOURCE_ENUM, ORDER_STATUS_ENUM, TENANT_STATUS_ENUMS } from "@catering/types";
import { MongoQuery } from "@ims-systems-00/ims-query-builder";
import { StatusCodes } from "http-status-codes";
import {
  ApiResponse,
  type AuthenticatedControllerParams,
  type ControllerParams,
  formatListResponse,
  UnauthorizedException,
} from "../../../common/helper";
import * as tenantService from "../tenant/service";
import { roleScopedSecurityQuery } from "./query";
import * as orderService from "./service";

const ORDER_SEARCH_FIELDS = ["orderNo", "customerName", "customerPhone"];

/** Turn a `YYYY-MM-DD` (or ISO) delivery-date filter into a UTC day range match. */
const buildDeliveryDateMatch = (value: unknown) => {
  if (!value) return null;

  const start = new Date(String(value));
  if (Number.isNaN(start.getTime())) return null;

  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setUTCDate(start.getUTCDate() + 1);

  return { deliveryDate: { $gte: start, $lt: end } };
};

export const list = async ({ req }: AuthenticatedControllerParams) => {
  const ability = new OrderAbilityBuilder(req.session).getAbility();

  if (!ability.can(AbilityAction.READ, OrderAuthZEntity)) {
    throw new UnauthorizedException("You are not authorized to read orders.");
  }

  // Delivery date is matched as a day range, so keep it out of the equality filter.
  const { deliveryDate, ...queryForMongo } = req.query;
  const filter = new MongoQuery(queryForMongo, { searchFields: ORDER_SEARCH_FIELDS }).build();

  const conditions: Record<string, unknown>[] = [filter.getFilterQuery(), roleScopedSecurityQuery(ability)];
  const deliveryDateMatch = buildDeliveryDateMatch(deliveryDate);
  if (deliveryDateMatch) conditions.push(deliveryDateMatch);

  const results = await orderService.list({
    query: { $and: conditions },
    options: filter.getQueryOptions(),
  });

  const { data, pagination } = formatListResponse(results);

  return new ApiResponse({
    message: "Orders retrieved",
    statusCode: StatusCodes.OK,
    data,
    fieldName: "orders",
    pagination,
  });
};

export const getOne = async ({ req }: AuthenticatedControllerParams) => {
  const ability = new OrderAbilityBuilder(req.session).getAbility();

  const order = await orderService.getOne({ query: { _id: req.params.id } });

  if (
    !order ||
    !ability.can(
      AbilityAction.READ,
      new OrderAuthZEntity({ tenantId: order.tenantId?.toString(), userId: order.userId?.toString() }),
    )
  ) {
    throw new UnauthorizedException("You are not authorized to read this order.");
  }

  return new ApiResponse({
    message: "Order retrieved.",
    statusCode: StatusCodes.OK,
    data: order,
    fieldName: "order",
  });
};

export const create = async ({ req }: AuthenticatedControllerParams) => {
  const ability = new OrderAbilityBuilder(req.session).getAbility();

  if (!ability.can(AbilityAction.CREATE, new OrderAuthZEntity({ tenantId: req.body.tenantId }))) {
    throw new UnauthorizedException("You are not authorized to create an order for this tenant.");
  }

  const order = await orderService.create({ payload: req.body });

  return new ApiResponse({
    message: "Order created.",
    statusCode: StatusCodes.CREATED,
    data: order,
    fieldName: "order",
  });
};

export const update = async ({ req }: AuthenticatedControllerParams) => {
  const ability = new OrderAbilityBuilder(req.session).getAbility();

  const { id, ...payload } = req.body;

  const existing = await orderService.getOne({ query: { _id: id } });

  if (
    !ability.can(
      AbilityAction.UPDATE,
      new OrderAuthZEntity({ tenantId: existing.tenantId?.toString(), userId: existing.userId?.toString() }),
    )
  ) {
    throw new UnauthorizedException("You are not authorized to update this order.");
  }

  const order = await orderService.update({ query: { _id: id }, payload });

  return new ApiResponse({
    message: "Order updated.",
    statusCode: StatusCodes.OK,
    data: order,
    fieldName: "order",
  });
};

export const remove = async ({ req }: AuthenticatedControllerParams) => {
  const ability = new OrderAbilityBuilder(req.session).getAbility();

  const existing = await orderService.getOne({ query: { _id: req.params.id } });

  if (
    !ability.can(
      AbilityAction.HARD_DELETE,
      new OrderAuthZEntity({ tenantId: existing.tenantId?.toString(), userId: existing.userId?.toString() }),
    )
  ) {
    throw new UnauthorizedException("You are not authorized to delete this order.");
  }

  await orderService.hardDelete({ query: { _id: req.params.id } });

  return new ApiResponse({
    message: "Order deleted.",
    statusCode: StatusCodes.OK,
    data: null,
    fieldName: "order",
  });
};

// --- Public storefront endpoint (no authentication) ---

export const createPublicByTenantSlug = async ({ req }: ControllerParams) => {
  // Resolve the tenant by its public slug (throws 404 when missing/inactive).
  const tenant = await tenantService.getOne({
    query: { slug: req.params.slug, status: TENANT_STATUS_ENUMS.ACTIVE },
  });

  // Link the order to the signed-in customer when a session is present, so it
  // surfaces in their account order history. Guest checkouts stay unlinked.
  const userId = req.session?.user?.id ?? null;

  const order = await orderService.create({
    payload: {
      ...req.body,
      userId,
      tenantId: tenant._id,
      source: ORDER_SOURCE_ENUM.CLIENT_PORTAL,
      status: ORDER_STATUS_ENUM.CONFIRMED,
    },
  });

  return new ApiResponse({
    message: "Order placed.",
    statusCode: StatusCodes.CREATED,
    data: order,
    fieldName: "order",
  });
};
