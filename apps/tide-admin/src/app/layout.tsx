import { InlineScript, ThemeToggle } from "@tide-web/components";
import { createThemeInitScript } from "@tide-web/libs";
import type { Metadata } from "next";

import { getCurrentUser } from "@/apis/currentUser/currentUser.api";
import { AppShell } from "@/components/AppShell";
import { CommandPalette } from "@/components/CommandPalette";
import { Sidebar } from "@/components/Sidebar";
import {
  PRETENDARD_ORIGIN,
  PRETENDARD_PRELOAD_HREFS,
  PRETENDARD_STYLESHEET_HREF,
} from "@/constants/font";
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
        <InlineScript html={createThemeInitScript(THEME_STORAGE_KEY)} />
        {/*
          Pretendard 가변 동적 subset(tide 「폰트 로드」 안내). 페이지에 쓰인 글자 조각만 내려받는다.
          CSS를 읽은 뒤에야 조각 요청이 시작되면 fallback 글꼴 → Pretendard 교체가 늦어 화면이 움찔하므로,
          CDN에 먼저 연결하고 자주 쓰는 조각은 CSS와 함께 미리 받는다.
        */}
        <link rel="preconnect" href={PRETENDARD_ORIGIN} crossOrigin="anonymous" />
        <link rel="stylesheet" href={PRETENDARD_STYLESHEET_HREF} />
        {PRETENDARD_PRELOAD_HREFS.map((href) => (
          <link
            key={href}
            rel="preload"
            href={href}
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        ))}
      </head>
      <body className="bg-canvas text-default antialiased">
        <CommandPalette items={[...NAV_ITEMS, ...FOOTER_NAV_ITEMS]}>
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
        </CommandPalette>
      </body>
    </html>
  );
}
