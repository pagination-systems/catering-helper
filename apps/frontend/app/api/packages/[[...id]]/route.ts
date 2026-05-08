import { PACKAGE_STATUS_ENUM, type PaginationMeta } from "@catering/types";
import { NextResponse } from "next/server";
import { dayOrder, type IDayPlan, type IPackage } from "@/features/admin/packages/schemas/package.schema";

type PackagePayload = Partial<
  Pick<IPackage, "tenantId" | "name" | "description" | "pricePerMeal" | "status" | "days">
> & {
  id?: string;
};

const buildPagination = (totalDocs: number, page: number, limit: number): PaginationMeta => {
  const totalPages = Math.max(1, Math.ceil(totalDocs / limit));

  return {
    totalDocs,
    limit,
    hasPrevPage: page > 1,
    hasNextPage: page < totalPages,
    page,
    totalPages,
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page < totalPages ? page + 1 : null,
    pagingCounter: (page - 1) * limit + 1,
  };
};

const buildDays = (seed: number): IDayPlan[] =>
  dayOrder.map((day, dayIndex) => ({
    day,
    variants: [
      {
        id: `pkg-${seed}-${dayIndex + 1}-v1`,
        name: `${day} Standard`,
        note: `Mock variant for ${day} meals`,
        items: [`Rice ${seed}`, `Dal ${dayIndex + 1}`, `Vegetable ${day}`],
        available: true,
      },
      {
        id: `pkg-${seed}-${dayIndex + 1}-v2`,
        name: `${day} Premium`,
        note: `Upsell option for ${day}`,
        items: [`Rice ${seed}`, `Chicken ${dayIndex + 1}`, `Salad ${day}`],
        available: dayIndex % 2 === 0,
      },
    ],
  }));

const buildPackage = (seed: number, overrides: PackagePayload = {}): IPackage => {
  const now = new Date();
  const createdAt = new Date(now.getTime() - seed * 24 * 60 * 60 * 1000);

  return {
    id: overrides.id ?? `package-${seed}`,
    tenantId: overrides.tenantId ?? `tenant-${(seed % 4) + 1}`,
    name: overrides.name ?? `Package ${String(seed).padStart(2, "0")}`,
    description:
      overrides.description ?? `Mock package ${seed} for testing package list, detail, and mutation flows.`,
    pricePerMeal: overrides.pricePerMeal ?? 120 + seed * 10,
    status: overrides.status ?? (seed % 2 === 0 ? PACKAGE_STATUS_ENUM.ACTIVE : PACKAGE_STATUS_ENUM.INACTIVE),
    days: overrides.days ?? buildDays(seed),
    createdAt,
    updatedAt: now,
  };
};

const buildPackageResponse = (packageItem: IPackage | null, statusCode: number, message: string) =>
  NextResponse.json(
    {
      message,
      statusCode,
      data: packageItem,
      package: packageItem,
    },
    { status: statusCode },
  );

const generatePackages = (): IPackage[] => {
  const packages: IPackage[] = [];

  for (let seed = 1; seed <= 18; seed += 1) {
    packages.push(buildPackage(seed));
  }

  return packages.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
};

const globalForPackages = globalThis as unknown as {
  _mockPackages: IPackage[] | undefined;
};

if (!globalForPackages._mockPackages) {
  globalForPackages._mockPackages = generatePackages();
}

const getPackagesArray = () => globalForPackages._mockPackages!;
const setPackagesArray = (packages: IPackage[]) => {
  globalForPackages._mockPackages = packages;
};

const matchesSearch = (packageItem: IPackage, searchValue: string) => {
  if (!searchValue) return true;

  const searchableText = [
    packageItem.name,
    packageItem.description,
    packageItem.tenantId,
    ...packageItem.days.flatMap((day) => [
      day.day,
      ...day.variants.flatMap((variant) => [variant.name, variant.note, ...variant.items]),
    ]),
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(searchValue);
};

const buildPackageFromPayload = (payload: PackagePayload, existingPackage?: IPackage): IPackage => {
  const now = new Date();
  const seed = Number(existingPackage?.id?.split("-").pop() ?? payload.id?.split("-").pop() ?? Date.now());

  return {
    id: payload.id ?? existingPackage?.id ?? `package-${Date.now()}`,
    tenantId: payload.tenantId ?? existingPackage?.tenantId ?? `tenant-${(seed % 4) + 1}`,
    name: payload.name ?? existingPackage?.name ?? `Package ${String(seed).padStart(2, "0")}`,
    description:
      payload.description ?? existingPackage?.description ?? "Mock package for testing package mutations.",
    pricePerMeal: payload.pricePerMeal ?? existingPackage?.pricePerMeal ?? 150,
    status: payload.status ?? existingPackage?.status ?? PACKAGE_STATUS_ENUM.ACTIVE,
    days: payload.days ?? existingPackage?.days ?? buildDays(seed),
    createdAt: existingPackage?.createdAt ?? now,
    updatedAt: now,
  };
};

export async function GET(request: Request, context: { params: Promise<{ id?: string[] }> }) {
  const params = await context.params;
  const idValue = params.id ? params.id[0] : null;

  if (idValue && idValue !== "packages" && idValue !== "api") {
    const packageItem = getPackagesArray().find((entry) => entry.id === idValue) ?? null;

    return buildPackageResponse(
      packageItem,
      packageItem ? 200 : 404,
      packageItem ? "Package fetched successfully" : "Package not found",
    );
  }

  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);
  const limit = Number.parseInt(searchParams.get("limit") || "10", 10);
  const status = searchParams.get("status");
  const tenantId = searchParams.get("tenantId");
  const search = (searchParams.get("search") || searchParams.get("clientSearch") || "").toLowerCase();

  let filteredPackages = getPackagesArray();

  if (search) {
    filteredPackages = filteredPackages.filter((packageItem) => matchesSearch(packageItem, search));
  }

  if (status) {
    filteredPackages = filteredPackages.filter((packageItem) => packageItem.status === status);
  }

  if (tenantId) {
    filteredPackages = filteredPackages.filter((packageItem) => packageItem.tenantId === tenantId);
  }

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const totalDocs = filteredPackages.length;
  const paginatedPackages = filteredPackages.slice(startIndex, endIndex);

  return NextResponse.json({
    message: "Packages fetched",
    statusCode: 200,
    data: paginatedPackages,
    packages: paginatedPackages,
    meta: {
      pagination: buildPagination(totalDocs, page, limit),
    },
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PackagePayload;
    const packageItem = buildPackageFromPayload(body);

    setPackagesArray([packageItem, ...getPackagesArray()]);

    return NextResponse.json(
      {
        message: "Package created",
        statusCode: 201,
        data: packageItem,
        package: packageItem,
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
    const body = (await request.json()) as PackagePayload;
    const id = body.id ?? (params.id ? params.id[0] : null);

    if (!id) {
      return NextResponse.json({ message: "Missing id", statusCode: 400 }, { status: 400 });
    }

    const allPackages = getPackagesArray();
    const existingPackage = allPackages.find((entry) => entry.id === id);

    if (!existingPackage) {
      return NextResponse.json({ message: "Package not found", statusCode: 404 }, { status: 404 });
    }

    const updatedPackage = buildPackageFromPayload({ ...body, id }, existingPackage);
    setPackagesArray(allPackages.map((entry) => (entry.id === id ? updatedPackage : entry)));

    return NextResponse.json({
      message: "Package updated",
      statusCode: 200,
      data: updatedPackage,
      package: updatedPackage,
    });
  } catch {
    return NextResponse.json({ message: "Invalid payload", statusCode: 400 }, { status: 400 });
  }
}

export async function DELETE(_request: Request, context: { params: Promise<{ id?: string[] }> }) {
  try {
    const params = await context.params;
    const id = params.id ? params.id[0] : null;

    if (!id || id === "packages") {
      return NextResponse.json({ message: "Missing id", statusCode: 400 }, { status: 400 });
    }

    const allPackages = getPackagesArray();
    const initialLength = allPackages.length;
    setPackagesArray(allPackages.filter((entry) => entry.id !== id));

    if (getPackagesArray().length === initialLength) {
      return NextResponse.json({ message: "Package not found", statusCode: 404 }, { status: 404 });
    }

    return NextResponse.json({ message: "Package deleted", statusCode: 200, package: null });
  } catch {
    return NextResponse.json({ message: "Invalid request", statusCode: 400 }, { status: 400 });
  }
}

export const runtime = "edge";