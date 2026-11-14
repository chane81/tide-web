import { ThemeToggle } from "@tide-web/components";
import { createThemeInitScript } from "@tide-web/libs";
import type { Metadata } from "next";

import { getCurrentUser } from "@/apis/currentUser.api";
import { AppShell } from "@/components/AppShell";
import { Sidebar } from "@/components/Sidebar";
import { FOOTER_NAV_ITEMS, NAV_ITEMS } from "@/constants/navItems";
import { THEME_STORAGE_KEY } from "@/constants/theme";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: "tide-web", template: "%s · tide-web" },
  description: "tide 디자인 시스템으로 만든 대시보드",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  return (
    // 인라인 스크립트가 hydration 전에 data-theme을 붙이므로 <html> 속성 차이는 경고하지 않는다.
    <html lang="ko" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: createThemeInitScript(THEME_STORAGE_KEY) }} />
        {/* Pretendard 가변 동적 subset(tide 「폰트 로드」 안내). 페이지에 쓰인 글자 조각만 내려받는다. 버전은 고정한다. */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
      </head>
      <body className="bg-canvas text-default">
        <AppShell
          sidebar={
            <Sidebar
              items={NAV_ITEMS}
              footerItems={FOOTER_NAV_ITEMS}
              user={user}
              footerActions={<ThemeToggle storageKey={THEME_STORAGE_KEY} />}
            />
          }
        >
          {children}
        </AppShell>
      </body>
    </html>
  );
}
