import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 'use cache'·cacheLife()·connection()으로 렌더 정책을 정한다(.claude/rules/app-structure.md 8-2).
  cacheComponents: true,
  // 새 Cache Components 앱은 Partial Prefetching을 함께 켠다(Next.js 16.4 안내).
  partialPrefetching: true,
};

export default nextConfig;
