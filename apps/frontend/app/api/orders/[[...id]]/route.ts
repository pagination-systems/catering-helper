import { ORDER_STATUS_ENUM } from "@catering/types";
import { NextResponse } from "next/server";

type DayName = "Sun" | "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat";

type IOrderItem = {
  id: string;
  packageName: string;
  variantName: string;
  items: string[];
  quantity: number;
  pricePerMeal: number;
  subtotal: number;
  deliveryDate: string;
};

type IOrder = {
  id: string;
  tenantId: string;
  orderNo: string;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  notes: string;
  packageName: string;
  source: "Client Portal" | "Admin Panel";
  status: ORDER_STATUS_ENUM;
  deliveryDay: DayName;
  deliveryDate: string;
  items: IOrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  totalMeals: number;
  createdAt: string;
  updatedAt: string;
};

type OrderPayload = Partial<
  Pick<
    IOrder,
    | "tenantId"
    | "orderNo"
    | "customerName"
    | "customerPhone"
    | "notes"
    | "packageName"
    | "source"
    | "status"
    | "deliveryDate"
    | "deliveryDay"
    | "deliveryFee"
  >
> & {
  address?: string;
  deliveryAddress?: string;
  items?: Array<Partial<IOrderItem> & { id?: string }>;
};

const toDayName = (dateValue: string) => {
  const date = new Date(dateValue);
  const dayIndex = date.getDay();
  return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayIndex] as DayName;
};

const buildOrderResponse = (order: IOrder | null, statusCode: number, message: string) =>
  NextResponse.json(
    {
      message,
      statusCode,
      data: order,
      order,
    },
    { status: statusCode },
  );

const normalizeItems = (items: OrderPayload["items"], orderId: string, fallbackDeliveryDate: string) => {
  const now = new Date().toISOString();

  return (items ?? []).map((it, idx) => {
    const quantity = Number(it.quantity ?? 0);
    const pricePerMeal = Number(it.pricePerMeal ?? 0);
    const deliveryDate = it.deliveryDate ?? fallbackDeliveryDate;

    return {
      id: it.id ?? `${orderId}-i-${idx}`,
      packageName: it.packageName ?? "",
      variantName: it.variantName ?? "",
      items: it.items ?? ["Rice", "Dal", "Vegetable"],
      quantity,
      pricePerMeal,
      subtotal: it.subtotal ?? quantity * pricePerMeal,
      deliveryDate: deliveryDate || now,
    };
  });
};

const buildOrder = (payload: OrderPayload, existingOrder?: IOrder): IOrder => {
  const now = new Date().toISOString();
  const orderId = existingOrder?.id ?? `id-${Date.now()}`;
  const deliveryDate = payload.deliveryDate ?? existingOrder?.deliveryDate ?? now;
  const items = normalizeItems(payload.items ?? existingOrder?.items, orderId, deliveryDate);
  const subtotal = items.reduce((sum, item) => sum + (item.subtotal || 0), 0);
  const deliveryFee = Number(payload.deliveryFee ?? existingOrder?.deliveryFee ?? 60);
  const deliveryAddress = payload.deliveryAddress ?? payload.address ?? existingOrder?.deliveryAddress ?? "";

  return {
    id: orderId,
    tenantId: payload.tenantId ?? existingOrder?.tenantId ?? "tenant-1",
    orderNo: payload.orderNo ?? existingOrder?.orderNo ?? `ORD-${Date.now()}`,
    customerName: payload.customerName ?? existingOrder?.customerName ?? "",
    customerPhone: payload.customerPhone ?? existingOrder?.customerPhone ?? "",
    deliveryAddress,
    notes: payload.notes ?? existingOrder?.notes ?? "",
    packageName: payload.packageName ?? existingOrder?.packageName ?? "",
    source: payload.source ?? existingOrder?.source ?? "Admin Panel",
    status: payload.status ?? existingOrder?.status ?? ORDER_STATUS_ENUM.CONFIRMED,
    deliveryDay: payload.deliveryDay ?? existingOrder?.deliveryDay ?? toDayName(deliveryDate),
    deliveryDate,
    items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    totalMeals: items.reduce((sum, item) => sum + (item.quantity || 0), 0),
    createdAt: existingOrder?.createdAt ?? now,
    updatedAt: now,
  };
};

const generateOrders = (): IOrder[] => {
  const baseDate = new Date();
  const orders: IOrder[] = [];

  for (let i = 1; i <= 55; i++) {
    const deliveryDate = new Date(baseDate.getTime() + (i % 7) * 24 * 60 * 60 * 1000).toISOString();
    const quantity = 5 + (i % 10);
    const pricePerMeal = 100 + ((i * 10) % 50);
    const subtotal = quantity * pricePerMeal;

    orders.push({
      id: `order-${i}`,
      tenantId: `tenant-${(i % 3) + 1}`,
      orderNo: `ORD-240101-${String(i).padStart(4, "0")}`,
      customerName: `Customer ${i}`,
      customerPhone: `0171${String(i).padStart(7, "0")}`,
      deliveryAddress: `Address ${i}, Dhaka, Bangladesh`,
      notes: i % 3 === 0 ? `Special notes for order ${i}` : "",
      packageName: i % 3 === 0 ? "Premium" : "Standard",
      source: i % 2 === 0 ? "Client Portal" : "Admin Panel",
      status: [ORDER_STATUS_ENUM.CONFIRMED, ORDER_STATUS_ENUM.CANCELLED][i % 2] as ORDER_STATUS_ENUM,
      deliveryDay: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i % 7] as DayName,
      deliveryDate,
      items: [
        {
          id: `item-${i}-1`,
          packageName: i % 3 === 0 ? "Premium" : "Standard",
          variantName: i % 2 === 0 ? "Regular" : "Spicy",
          items: ["Rice", "Dal", "Vegetable"],
          quantity,
          pricePerMeal,
          subtotal,
          deliveryDate,
        },
      ],
      subtotal,
      deliveryFee: 60,
      total: subtotal + 60,
      totalMeals: quantity,
      createdAt: new Date(baseDate.getTime() - (55 - i) * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date().toISOString(),
    });
  }

  // Sort newest first
  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

const globalForOrders = globalThis as unknown as {
  _mockOrders: IOrder[] | undefined;
};

if (!globalForOrders._mockOrders) {
  globalForOrders._mockOrders = generateOrders();
}

const getOrdersArray = () => globalForOrders._mockOrders!;
const setOrdersArray = (newOrders: IOrder[]) => {
  globalForOrders._mockOrders = newOrders;
};

export async function GET(request: Request, context: { params: Promise<{ id?: string[] }> }) {
  const params = await context.params;
  const idValue = params.id ? params.id[0] : null;

  if (idValue && idValue !== "orders" && idValue !== "api") {
    const order = getOrdersArray().find((entry) => entry.id === idValue) ?? null;
    return buildOrderResponse(order, order ? 200 : 404, order ? "Order fetched successfully" : "Order not found");
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);

  const search = searchParams.get("search")?.toLowerCase() || "";
  const status = searchParams.get("status");
  const source = searchParams.get("source");
  const packageName = searchParams.get("packageName");
  const deliveryDate = searchParams.get("deliveryDate");

  let filteredOrders = getOrdersArray();

  if (search) {
    filteredOrders = filteredOrders.filter(
      (order) =>
        order.customerName.toLowerCase().includes(search) ||
        order.customerPhone.toLowerCase().includes(search) ||
        order.orderNo.toLowerCase().includes(search),
    );
  }

  if (status) {
    filteredOrders = filteredOrders.filter((order) => order.status === status);
  }

  if (source) {
    filteredOrders = filteredOrders.filter((order) => order.source === source);
  }

  if (packageName) {
    filteredOrders = filteredOrders.filter(
      (order) => order.packageName === packageName || order.items.some((item) => item.packageName === packageName),
    );
  }

  if (deliveryDate) {
    // Assuming deliveryDate is a YYYY-MM-DD or full date string
    filteredOrders = filteredOrders.filter((order) => {
      const orderDate = new Date(order.deliveryDate).toISOString().split("T")[0];
      const filterDate = new Date(deliveryDate).toISOString().split("T")[0];
      return orderDate === filterDate;
    });
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const totalDocs = filteredOrders.length;
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit));
  const paginatedOrders = filteredOrders.slice(startIndex, endIndex);

  return NextResponse.json({
    message: "Orders fetched",
    statusCode: 200,
    data: paginatedOrders,
    orders: paginatedOrders,
    meta: {
      pagination: {
        totalDocs,
        limit,
        hasPrevPage: page > 1,
        hasNextPage: page < totalPages,
        page,
        totalPages,
        prevPage: page > 1 ? page - 1 : null,
        nextPage: page < totalPages ? page + 1 : null,
        pagingCounter: startIndex + 1,
      },
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const order = buildOrder(body);

    setOrdersArray([order, ...getOrdersArray()]);

    return NextResponse.json(
      {
        message: "Order created",
        statusCode: 201,
        data: order,
        order,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ message: "Invalid payload", statusCode: 400 }, { status: 400 });
  }
}

export async function PUT(request: Request, context: { params: Promise<{ id?: string[] }> }) {
  try {
    const params = await context.params;
    const body = await request.json();
    const { id: bodyId, ...values } = body as OrderPayload & { id?: string };
    const id = bodyId ?? (params.id ? params.id[0] : null);

    if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

    const allOrders = getOrdersArray();
    const existingOrder = allOrders.find((entry) => entry.id === id);
    if (!existingOrder) {
      return NextResponse.json({ message: "Order not found", statusCode: 404 }, { status: 404 });
    }

    const updatedOrder = buildOrder(values as OrderPayload, existingOrder);
    setOrdersArray(allOrders.map((entry) => (entry.id === id ? updatedOrder : entry)));

    return NextResponse.json({
      message: "Order updated",
      statusCode: 200,
      data: updatedOrder,
      order: updatedOrder,
    });
  } catch {
    return NextResponse.json({ message: "Invalid payload", statusCode: 400 }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id?: string[] }> }) {
  try {
    const params = await context.params;
    const id = params.id ? params.id[0] : null;

    if (!id || id === "orders") return NextResponse.json({ message: "Missing id", statusCode: 400 }, { status: 400 });

    const allOrders = getOrdersArray();
    const initialLength = allOrders.length;
    setOrdersArray(allOrders.filter((o) => o.id !== id));

    if (getOrdersArray().length === initialLength) {
      return NextResponse.json({ message: "Order not found", statusCode: 404 }, { status: 404 });
    }

    return NextResponse.json({ message: "Order deleted", statusCode: 200, order: null });
  } catch {
    return NextResponse.json({ message: "Invalid request", statusCode: 400 }, { status: 400 });
  }
}

export const runtime = "edge";
