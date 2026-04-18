# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS base
ENV PNPM_HOME=/pnpm
ENV PATH=$PNPM_HOME:$PATH
RUN corepack enable
WORKDIR /repo

FROM base AS deps
COPY pnpm-workspace.yaml package.json ./
COPY apps/backend/package.json apps/backend/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/utils/package.json packages/utils/package.json
COPY packages/authz/package.json packages/authz/package.json
RUN pnpm install --frozen-lockfile=false

FROM deps AS builder
COPY . .
RUN pnpm --filter @catering/types run build
RUN pnpm --filter @catering/utils run build
RUN pnpm --filter @catering/authz run build
RUN pnpm --filter @catering/backend run build

FROM base AS runner
ENV NODE_ENV=production
ENV PORT=5000
WORKDIR /repo
COPY pnpm-workspace.yaml package.json ./
COPY apps/backend/package.json apps/backend/package.json
COPY packages/types/package.json packages/types/package.json
COPY packages/utils/package.json packages/utils/package.json
COPY packages/authz/package.json packages/authz/package.json
COPY --from=builder /repo/apps/backend/dist apps/backend/dist
COPY --from=builder /repo/packages/types/dist packages/types/dist
COPY --from=builder /repo/packages/utils/dist packages/utils/dist
COPY --from=builder /repo/packages/authz/dist packages/authz/dist
RUN pnpm install --prod --frozen-lockfile=false --filter @catering/backend...
EXPOSE 5000
CMD ["node", "apps/backend/dist/index.js"]
