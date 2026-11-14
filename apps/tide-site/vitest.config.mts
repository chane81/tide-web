import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    // tsconfig의 `@/*` 별칭을 테스트에서도 쓴다(Vite 8 내장 기능).
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
    // tide styles.css는 테스트에서 해석하지 않는다(동작만 본다).
    css: false,
  },
});
