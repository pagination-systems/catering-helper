/* eslint-disable @typescript-eslint/no-explicit-any */

import type { ClientSession } from "mongoose";
import { Types } from "mongoose";
import { BadRequestException, NotFoundException } from "../../../common/helper";
import { sanitizeQueryIds } from "../../../common/helper/sanitizeQueryIds";
import { excludeDeletedQuery, matchQuery } from "../../../common/query";
import { Order, Package, Tenant } from "../../../models";
import { type IOrderItem, ORDER_DAY_ENUMS, type OrderDay } from "../../../models/order";
import type { IListOrderParams, IOrderCreateParams, IOrderGetParams, IOrderUpdateParams } from "./interface";
import { orderProjectionQuery } from "./query";

// Fallback only used when an order somehow has no resolvable tenant.
const DEFAULT_DELIVERY_FEE = 0;

/** Delivery fee is owned by the tenant, never the client. Falls back to 0. */
const resolveDeliveryFee = async (tenantId: string | null, session?: ClientSession): Promise<number> => {
  if (!tenantId) return DEFAULT_DELIVERY_FEE;
  const tenant = await Tenant.findById(tenantId, "deliveryFee", { session });
  return Number(tenant?.deliveryFee ?? DEFAULT_DELIVERY_FEE);
};

/** Derive the 3-letter delivery day from a delivery date (UTC to match ISO date input). */
const deriveDeliveryDay = (deliveryDate: Date): OrderDay => ORDER_DAY_ENUMS[new Date(deliveryDate).getUTCDay()];

/** Human-readable, reasonably unique order number, e.g. ORD-20260702-4821. */
const generateOrderNo = (): string => {
  const now = new Date();
  const ymd = `${now.getUTCFullYear()}${String(now.getUTCMonth() + 1).padStart(2, "0")}${String(
    now.getUTCDate(),
  ).padStart(2, "0")}`;
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${ymd}-${random}`;
};

/**
 * Resolves each line item's price and name from the referenced package so the
 * client can never dictate pricing. `pricePerMeal`, `subtotal` and `packageName`
 * are always taken from the live catalog; the client only chooses the package,
 * variant, quantity and (optionally) a food-item snapshot. Also reports the set
 * of tenants the packages belong to, used to keep an order tenant-consistent.
 */
const resolveItems = async (
  rawItems: any[],
  session?: ClientSession,
): Promise<{ items: IOrderItem[]; tenantIds: Set<string> }> => {
  const packageIds = [...new Set(rawItems.map((item) => String(item.packageId)))];

  const packages = await Package.find({ _id: { $in: packageIds }, "deleteMarker.status": { $ne: true } }, null, {
    session,
  });
  const packageById = new Map(packages.map((pkg) => [pkg._id.toString(), pkg]));

  const items = rawItems.map((raw) => {
    const pkg = packageById.get(String(raw.packageId));
    if (!pkg) throw new NotFoundException("One of the ordered packages could not be found.");

    const quantity = Number(raw.quantity ?? 0);
    const pricePerMeal = Number(pkg.pricePerMeal ?? 0);

    return {
      id: raw.id || new Types.ObjectId().toString(),
      packageId: pkg._id,
      packageName: pkg.name,
      variantName: raw.variantName,
      items: raw.items ?? [],
      quantity,
      pricePerMeal,
      subtotal: quantity * pricePerMeal,
    } as IOrderItem;
  });

  const tenantIds = new Set(packages.map((pkg) => pkg.tenantId?.toString()).filter((id): id is string => Boolean(id)));

  return { items, tenantIds };
};

export const list = ({ query = {}, options, session }: IListOrderParams) => {
  const aggregate = Order.aggregate([
    ...matchQuery(sanitizeQueryIds(query)),
    ...excludeDeletedQuery(),
    ...orderProjectionQuery(),
  ]);

  if (session) aggregate.session(session);

  return Order.aggregatePaginate(aggregate, options);
};

export const getOne = async ({ query = {}, session }: IOrderGetParams) => {
  const aggregate = Order.aggregate([
    ...matchQuery(sanitizeQueryIds(query)),
    ...excludeDeletedQuery(),
    ...orderProjectionQuery(),
  ]);

  if (session) aggregate.session(session);

  const orders = await aggregate;

  if (orders.length === 0) throw new NotFoundException("Order not found.");
  return orders[0];
};

export const create = async ({ payload, session }: IOrderCreateParams) => {
  const raw = payload as Record<string, any>;
  const { items, tenantIds } = await resolveItems(raw.items ?? [], session);

  // The order's tenant must be consistent with the packages it references.
  const requestedTenantId = raw.tenantId ? String(raw.tenantId) : null;
  if (requestedTenantId) {
    if ([...tenantIds].some((id) => id !== requestedTenantId)) {
      throw new BadRequestException("All packages must belong to the order's tenant.");
    }
  } else if (tenantIds.size > 1) {
    throw new BadRequestException("All items must belong to packages from the same tenant.");
  }
  const tenantId = requestedTenantId ?? [...tenantIds][0] ?? null;

  const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
  const totalMeals = items.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryDate = new Date(raw.deliveryDate);
  const deliveryFee = await resolveDeliveryFee(tenantId, session);

  const order = new Order({
    ...raw,
    tenantId,
    items,
    subtotal,
    totalMeals,
    deliveryDate,
    deliveryDay: deriveDeliveryDay(deliveryDate),
    orderNo: raw.orderNo || generateOrderNo(),
    deliveryFee,
    total: subtotal + deliveryFee,
  });
  const saved = await order.save({ session });

  return getOne({ query: { _id: saved._id } as any, session });
};

export const update = async ({ query, payload, session }: IOrderUpdateParams) => {
  const sanitizedQuery = sanitizeQueryIds(query);
  const existing = await getOne({ query: sanitizedQuery, session });

  const raw = payload as Record<string, any>;
  const derived: Record<string, any> = { ...raw };
  // Immutable once created — an order stays with its tenant and order number.
  delete derived.tenantId;
  delete derived.orderNo;

  if (raw.deliveryDate) {
    derived.deliveryDate = new Date(raw.deliveryDate);
    derived.deliveryDay = deriveDeliveryDay(derived.deliveryDate);
  }

  if (raw.items) {
    const { items, tenantIds } = await resolveItems(raw.items, session);

    // Replacing items must not move the order to a different tenant's packages.
    const orderTenantId = existing.tenantId?.toString();
    if (orderTenantId && [...tenantIds].some((id) => id !== orderTenantId)) {
      throw new BadRequestException("Packages must belong to the order's tenant.");
    }

    derived.items = items;
    derived.subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    derived.totalMeals = items.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Recompute total whenever subtotal or delivery fee changes.
  const nextSubtotal = derived.subtotal ?? existing.subtotal ?? 0;
  const nextDeliveryFee = derived.deliveryFee ?? existing.deliveryFee ?? DEFAULT_DELIVERY_FEE;
  if (derived.subtotal !== undefined || derived.deliveryFee !== undefined) {
    derived.deliveryFee = nextDeliveryFee;
    derived.total = nextSubtotal + nextDeliveryFee;
  }

  const updated = await Order.findOneAndUpdate({ _id: existing._id }, { $set: derived }, { new: true, session });

  if (!updated) throw new NotFoundException("Order not found.");

  return getOne({ query: { _id: updated._id } as any, session });
};

export const softDelete = async ({ query, session }: IOrderGetParams) => {
  const sanitizedQuery = sanitizeQueryIds(query);
  const order = await getOne({ query: sanitizedQuery, session });

  await Order.softDelete({ _id: order._id }, { session });

  return order;
};

export const hardDelete = async ({ query, session }: IOrderGetParams) => {
  const sanitizedQuery = sanitizeQueryIds(query);
  const order = await getOne({ query: sanitizedQuery, session });

  const deleted = await Order.findOneAndDelete({ _id: order._id }, { session });
  if (!deleted) throw new NotFoundException("Order not found to delete.");

  return order;
};
