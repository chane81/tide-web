import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 렌더 정책은 라우트마다 그 주인 안에 적는다: 정적은 'use cache'+cacheLife() 또는 기본 프리렌더,
  // 요청마다는 connection()+<Suspense>(.claude/rules/fe-monorepo-structure.md 13-2).
  cacheComponents: true,
  // 새 Cache Components 앱은 Partial Prefetching을 함께 켠다(Next.js 16.4 「Enabling Cache Components」).
  partialPrefetching: true,
};

export default nextConfig;
