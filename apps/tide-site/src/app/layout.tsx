import { InlineScript } from "@tide-web/components";
import { createThemeInitScript } from "@tide-web/libs";
import type { Metadata, Viewport } from "next";

import { KitScripts } from "@/components/KitScripts";
import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/constants/theme";

import "./globals.css";

const TITLE = "tide: Next.js 앱을 위한 React 디자인 시스템";
const DESCRIPTION =
  "Component 35종과 아이콘 2,029개를 토큰 하나로 칠하고, light·dark 대비를 WCAG 2.2 AA로 검사하는 React 디자인 시스템입니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  icons: { icon: { url: "/favicon.svg", type: "image/svg+xml" } },
  openGraph: { type: "website", title: TITLE, description: DESCRIPTION, images: ["/share.jpg"] },
  twitter: { card: "summary_large_image" },
  // design-taste-frontend 검사가 읽는 페이지 종류(SKILL.md 1절): 개발 도구 = software
  other: { "site-kind": "software", "page-type": "software" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  // tide gray-950(dark canvas). theme-color는 CSS 변수를 받지 않아 값으로 적는다.
  themeColor: "#28292c",
};

/** 키트가 첫 그림 전에 붙이는 표시: 히어로 등장 대기, moment 대기(설치 안내 그대로) */
const KIT_HEAD_SCRIPT =
  "document.documentElement.classList.add('m-enter','mo-js');setTimeout(()=>document.documentElement.classList.add('m-enter-done'),700);setTimeout(()=>document.documentElement.classList.add('mo-safe'),2500)";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // 인라인 스크립트가 hydration 전에 data-theme·class를 붙이므로 <html> 속성 차이는 경고하지 않는다.
    // data-type·data-radius·data-buttons·data-motion: design-taste-frontend 키트가 읽는 페이지 설정
    <html
      lang="ko"
      data-type="software"
      data-radius="soft"
      data-buttons="solid"
      data-motion=""
      suppressHydrationWarning
    >
      <head>
        <InlineScript html={createThemeInitScript(THEME_STORAGE_KEY, DEFAULT_THEME)} />
        <InlineScript html={KIT_HEAD_SCRIPT} />
        {/* Pretendard 가변 동적 subset(tide 「폰트 로드」 안내). 대시보드와 같은 버전이다. */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {/* 키트 CSS(public/kit.css)는 public/assets를 layer(kit)로 @import하는 파일 그대로 읽는다. 키트 파일은 번들하거나 고치지 않는다. */}
        {/* oxlint-disable-next-line nextjs/no-css-tags */}
        <link rel="stylesheet" href="/kit.css" />
        <link rel="modulepreload" href="/assets/moments/moments.js" />
        <link rel="modulepreload" href="/assets/moments/lib.js" />
        <link rel="modulepreload" href="/assets/moments/iris-opens/moment.js" />
        <link rel="modulepreload" href="/assets/moments/letters-assemble/moment.js" />
      </head>
      <body className="bg-canvas text-default">
        {children}
        <KitScripts />
      </body>
    </html>
  );
}
