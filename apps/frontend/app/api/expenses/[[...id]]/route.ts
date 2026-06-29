import { EXPENSE_CATEGORY_ENUM } from "@catering/types";
import { NextResponse } from "next/server";

type IExpense = {
  id: string;
  label: string;
  description?: string;
  date: string;
  category: EXPENSE_CATEGORY_ENUM;
  amount: number;
  tenantId: string;
  createdAt: string;
  updatedAt: string;
};

type ExpensePayload = Partial<
  Pick<IExpense, "label" | "description" | "date" | "category" | "amount" | "tenantId">
>;

const buildExpenseResponse = (item: IExpense | null, statusCode: number, message: string) =>
  NextResponse.json({ message, statusCode, item }, { status: statusCode });

const buildExpense = (payload: ExpensePayload, existing?: IExpense): IExpense => {
  const now = new Date().toISOString();
  return {
    id: existing?.id ?? `exp-${Date.now()}`,
    label: payload.label ?? existing?.label ?? "",
    description: payload.description ?? existing?.description,
    date: payload.date ?? existing?.date ?? now,
    category: payload.category ?? existing?.category ?? EXPENSE_CATEGORY_ENUM.OTHER,
    amount: Number(payload.amount ?? existing?.amount ?? 0),
    tenantId: payload.tenantId ?? existing?.tenantId ?? "tenant-1",
    createdAt: existing?.createdAt ?? now,
    updatedAt: now,
  };
};

const CATEGORIES = Object.values(EXPENSE_CATEGORY_ENUM);

const generateExpenses = (): IExpense[] => {
  const base = new Date();
  const expenses: IExpense[] = [];

  const labels = [
    "Weekly groceries",
    "Driver salary",
    "Delivery van fuel",
    "Kitchen rent",
    "Electricity bill",
    "Facebook ads",
    "Accounting software",
    "Chicken & beef stock",
    "Packaging materials",
    "Part-time helper",
  ];

  for (let i = 1; i <= 40; i++) {
    const daysAgo = 40 - i;
    const date = new Date(base.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    const category = CATEGORIES[i % CATEGORIES.length];

    expenses.push({
      id: `exp-${i}`,
      label: labels[i % labels.length],
      description: i % 4 === 0 ? `Notes for expense #${i}` : undefined,
      date: date.toISOString(),
      category,
      amount: 500 + ((i * 137) % 9500),
      tenantId: `tenant-${(i % 3) + 1}`,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
    });
  }

  return expenses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

const globalForExpenses = globalThis as unknown as { _mockExpenses: IExpense[] | undefined };

if (!globalForExpenses._mockExpenses) {
  globalForExpenses._mockExpenses = generateExpenses();
}

const getExpensesArray = () => globalForExpenses._mockExpenses!;
const setExpensesArray = (next: IExpense[]) => {
  globalForExpenses._mockExpenses = next;
};

export async function GET(request: Request, context: { params: Promise<{ id?: string[] }> }) {
  const params = await context.params;
  const idValue = params.id ? params.id[0] : null;

  if (idValue) {
    const item = getExpensesArray().find((e) => e.id === idValue) ?? null;
    return buildExpenseResponse(item, item ? 200 : 404, item ? "Expense fetched successfully" : "Expense not found");
  }

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const search = searchParams.get("clientSearch")?.toLowerCase() || searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("category");
  const tenantId = searchParams.get("tenantId");

  let filtered = getExpensesArray();

  if (tenantId) {
    filtered = filtered.filter((e) => e.tenantId === tenantId);
  }

  if (search) {
    filtered = filtered.filter((e) => e.label.toLowerCase().includes(search) || e.description?.toLowerCase().includes(search));
  }

  if (category && category !== "all") {
    filtered = filtered.filter((e) => e.category === category);
  }

  const totalDocs = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit));
  const startIndex = (page - 1) * limit;
  const items = filtered.slice(startIndex, startIndex + limit);

  return NextResponse.json({
    message: "Expenses fetched",
    statusCode: 200,
    items,
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
    const item = buildExpense(body as ExpensePayload);
    setExpensesArray([item, ...getExpensesArray()]);
    return NextResponse.json({ message: "Expense created", statusCode: 201, item }, { status: 201 });
  } catch {
    return NextResponse.json({ message: "Invalid payload", statusCode: 400 }, { status: 400 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...values } = body as ExpensePayload & { id?: string };

    if (!id) return NextResponse.json({ message: "Missing id", statusCode: 400 }, { status: 400 });

    const all = getExpensesArray();
    const existing = all.find((e) => e.id === id);
    if (!existing) return NextResponse.json({ message: "Expense not found", statusCode: 404 }, { status: 404 });

    const item = buildExpense(values as ExpensePayload, existing);
    setExpensesArray(all.map((e) => (e.id === id ? item : e)));

    return NextResponse.json({ message: "Expense updated", statusCode: 200, item });
  } catch {
    return NextResponse.json({ message: "Invalid payload", statusCode: 400 }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id?: string[] }> }) {
  try {
    const params = await context.params;
    const id = params.id ? params.id[0] : null;

    if (!id) return NextResponse.json({ message: "Missing id", statusCode: 400 }, { status: 400 });

    const all = getExpensesArray();
    const exists = all.some((e) => e.id === id);
    if (!exists) return NextResponse.json({ message: "Expense not found", statusCode: 404 }, { status: 404 });

    setExpensesArray(all.filter((e) => e.id !== id));
    return NextResponse.json({ message: "Expense deleted", statusCode: 200, item: null });
  } catch {
    return NextResponse.json({ message: "Invalid request", statusCode: 400 }, { status: 400 });
  }
}

export const runtime = "edge";
