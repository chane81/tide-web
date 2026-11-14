import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 소개 사이트는 서버 데이터가 없어 정적 HTML로 내보낸다(out/). design-taste-frontend 검사도 이 결과물을 읽는다.
  output: "export",
};

export default nextConfig;
