import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Docker(Dokploy) 배포용. node_modules 없이 .next/standalone만으로 서버를 띄운다.
  output: "standalone",
  // 모노레포 루트까지 추적해야 packages/shared/* dist가 standalone에 들어간다.
  outputFileTracingRoot: path.join(import.meta.dirname, "../.."),
  // 'use cache'·cacheLife()·connection()으로 렌더 정책을 정한다(.claude/rules/fe-monorepo-structure.md 13-2).
  cacheComponents: true,
  // 새 Cache Components 앱은 Partial Prefetching을 함께 켠다(Next.js 16.4 안내).
  partialPrefetching: true,
  // public 파일은 기본 캐시가 max-age=0이다. 폰트는 파일명에 버전이 있어 오래 캐시해도 안전하다.
  async headers() {
    return [
      {
        source: "/fonts/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
