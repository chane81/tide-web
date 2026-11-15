import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";

// bundleless: 소스 파일마다 dist 파일 하나. outBase를 src로 고정해 js와 d.ts 경로를 맞춘다. 'use client'도 파일별로 남는다.
// dts.isolated: tsconfig의 isolatedDeclarations로 d.ts를 파일별로 바로 만든다. 타입 검사는 typecheck 태스크가 맡는다.
// 테스트 파일은 dist에 넣지 않는다.
export default defineConfig({
  source: { entry: { index: ["./src/**", "!./src/**/*.test.*"] } },
  lib: [{ format: "esm", bundle: false, outBase: "./src", dts: { isolated: true } }],
  output: { target: "web" },
  plugins: [pluginReact()],
});
