# tide-admin 배포 이미지. 빌드 컨텍스트는 저장소 루트다.
#   docker build -f apps/tide-admin/Dockerfile -t tide-admin .

ARG NODE_VERSION=26-slim

# ---------- 1. 의존성 설치 + 빌드 ----------
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

# Node 25부터 corepack이 빠져 pnpm을 직접 설치한다. 버전은 루트 package.json의 packageManager와 맞춘다.
RUN npm install -g pnpm@12.11.2

ENV NEXT_TELEMETRY_DISABLED=1

COPY . .
RUN pnpm install --frozen-lockfile --filter "tide-admin..."
# ^build 의존으로 packages/shared/*를 먼저 빌드한다.
RUN pnpm turbo run build --filter=tide-admin

# ---------- 2. 실행 ----------
FROM node:${NODE_VERSION} AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# 모노레포 standalone은 루트 기준 경로(apps/tide-admin/server.js)로 나온다.
COPY --from=builder --chown=node:node /app/apps/tide-admin/.next/standalone ./
COPY --from=builder --chown=node:node /app/apps/tide-admin/.next/static ./apps/tide-admin/.next/static
# standalone은 public을 복사하지 않는다. 폰트가 여기 있다.
COPY --from=builder --chown=node:node /app/apps/tide-admin/public ./apps/tide-admin/public

USER node
EXPOSE 3000
CMD ["node", "apps/tide-admin/server.js"]
