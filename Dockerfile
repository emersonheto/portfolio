# Built in GitHub Actions and pulled by Dokploy; the VPS no longer compiles the site.
FROM node:24-bookworm-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

FROM node:24-bookworm-slim AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --no-audit --no-fund

FROM node:24-bookworm-slim AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG NEXT_PUBLIC_SITE_URL=https://portfolio.certilab.app
ARG NEXT_PUBLIC_SITE_NAME="Emerson Herrera Tolentino"
# The build needs no database: public pages are rendered on first request and cached.
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_SITE_NAME=$NEXT_PUBLIC_SITE_NAME \
    PAYLOAD_SECRET=build-only-placeholder-not-used-at-runtime \
    NEXT_TELEMETRY_DISABLED=1 \
    NODE_ENV=production
RUN npm run build

FROM node:24-bookworm-slim AS runtime
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000
# Production dependencies only; the Payload CLI (a dependency) runs migrations at start.
COPY --from=prod-deps --chown=node:node /app/node_modules ./node_modules
COPY --from=build --chown=node:node /app/.next ./.next
COPY --chown=node:node public ./public
COPY --chown=node:node package.json package-lock.json next.config.mjs tsconfig.json ./
COPY --chown=node:node src ./src
COPY --chown=node:node scripts ./scripts
USER node
EXPOSE 3000
CMD ["bash", "./scripts/start.sh"]
