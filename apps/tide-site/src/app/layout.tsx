import { InlineScript } from "@tide-web/components";
import { createThemeInitScript } from "@tide-web/libs";
import type { Metadata, Viewport } from "next";

import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/constants/theme";

import "./globals.css";

/** 모든 페이지에 같은 것. 제목·설명은 페이지마다 적는다. */
export const metadata: Metadata = {
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // tide light canvas(`--tide-bg-canvas` = `--tide-color-white`). 기본 테마가 light다.
  // theme-color는 CSS 변수를 받지 않아 값으로 적는다.
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // 인라인 스크립트가 hydration 전에 data-theme을 붙이므로 <html> 속성 차이는 경고하지 않는다.
    <html lang="ko" suppressHydrationWarning>
      <head>
        <InlineScript html={createThemeInitScript(THEME_STORAGE_KEY, DEFAULT_THEME)} />
        {/* Pretendard 가변 동적 subset(tide 「폰트 로드」 안내). 대시보드와 같은 버전이다. */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="bg-canvas text-default antialiased">{children}</body>
    </html>
  );
}
