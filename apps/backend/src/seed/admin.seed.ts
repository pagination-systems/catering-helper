import { ACCOUNT_TYPE_ENUMS, EMAIL_VERIFICATION_STATUS_ENUMS, TENANT_STATUS_ENUMS } from "@catering/types";
import mongoose from "mongoose";
import { connectDB } from "../.config/database";
import { env } from "../.config/env";
import { logger } from "../common/helper";
import { Tenant, User } from "../models";

/**
 * Seeds a platform administrator account.
 *
 * The `deserializeUser` middleware requires every authenticated user to have a
 * `tenantId` and a `type`, so the admin is attached to a dedicated "platform"
 * tenant. The admin's `type` is `ADMIN`, which the authorization layer treats as
 * the platform-wide super user (full access to tenant management / onboarding).
 *
 * Credentials are read from `ADMIN_USER_EMAIL` / `ADMIN_USER_PASSWORD`, falling
 * back to sensible development defaults. The script is idempotent: re-running it
 * never creates duplicates.
 *
 * Usage: `pnpm --filter @catering/backend seed:admin`
 */

const PLATFORM_TENANT_SLUG = "platform";

const ADMIN_EMAIL = env.ADMIN_USER_EMAIL ?? "admin@catering.local";
const ADMIN_PASSWORD = env.ADMIN_USER_PASSWORD ?? "Admin@12345";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ensurePlatformTenant = async (): Promise<any> => {
  const existing = await Tenant.findOne({ slug: PLATFORM_TENANT_SLUG } as any);
  if (existing) {
    logger.info(`Platform tenant already exists [${existing._id}].`);
    return existing;
  }

  const tenant = new Tenant({
    name: "Platform Administration",
    slug: PLATFORM_TENANT_SLUG,
    status: TENANT_STATUS_ENUMS.ACTIVE,
    description: "Internal tenant that owns the platform administrator account.",
  } as any);
  await tenant.save();

  logger.info(`Platform tenant created [${tenant._id}].`);
  return tenant;
};

const ensureAdminUser = async (tenantId: mongoose.Types.ObjectId) => {
  const existing = await User.findOne({ email: ADMIN_EMAIL } as any);
  if (existing) {
    logger.info(`Admin user already exists [${existing.email}]. Skipping creation.`);
    return existing;
  }

  const admin = new User({
    firstName: "Platform",
    lastName: "Admin",
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    type: ACCOUNT_TYPE_ENUMS.ADMIN,
    tenantId,
    emailVerificationStatus: EMAIL_VERIFICATION_STATUS_ENUMS.VERIFIED,
  } as any);
  await admin.save();

  logger.info(`Admin user created [${admin.email}].`);
  return admin;
};

const seedAdmin = async () => {
  await connectDB();

  const tenant = await ensurePlatformTenant();
  await ensureAdminUser(tenant._id as mongoose.Types.ObjectId);

  logger.info("✅ Admin seeding complete.");
  logger.info(`   email:    ${ADMIN_EMAIL}`);
  if (!env.ADMIN_USER_EMAIL || !env.ADMIN_USER_PASSWORD) {
    logger.warn("   ADMIN_USER_EMAIL / ADMIN_USER_PASSWORD not set — used development defaults.");
  }
};

seedAdmin()
  .then(async () => {
    await mongoose.disconnect();
    process.exit(0);
  })
  .catch(async (error) => {
    logger.error("❌ Admin seeding failed", error);
    await mongoose.disconnect();
    process.exit(1);
  });
