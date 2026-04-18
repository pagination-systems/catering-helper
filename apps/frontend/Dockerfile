# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable
WORKDIR /repo

FROM base AS deps
COPY pnpm-workspace.yaml package.json ./
COPY apps/frontend/package.json apps/frontend/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/utils/package.json packages/utils/package.json
COPY packages/authz/package.json packages/authz/package.json
RUN pnpm install --frozen-lockfile=false

FROM deps AS builder
COPY . .
RUN pnpm --filter @catering/types run build
RUN pnpm --filter @catering/utils run build
RUN pnpm --filter @catering/authz run build
RUN pnpm --filter @catering/frontend run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
RUN addgroup -S nodejs && adduser -S nextjs -G nodejs
COPY --from=builder /repo/apps/frontend/.next/standalone ./
COPY --from=builder /repo/apps/frontend/.next/static ./apps/frontend/.next/static
COPY --from=builder /repo/apps/frontend/public ./apps/frontend/public
USER nextjs
EXPOSE 3000
CMD ["node", "apps/frontend/server.js"]
