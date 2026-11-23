import { InlineScript, ThemeToggle } from "@tide-web/components";
import { createThemeInitScript } from "@tide-web/libs";
import type { Metadata } from "next";

import { getCurrentUser } from "@/apis/currentUser/currentUser.api";
import { AppShell } from "@/components/AppShell";
import { CommandPalette } from "@/components/CommandPalette";
import { Sidebar } from "@/components/Sidebar";
import { PRELOADED_FONT_URLS } from "@/constants/fonts";
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
        {/* 글자가 움찔하지 않도록 공통 Pretendard subset을 CSS보다 먼저 받는다. crossOrigin이 없으면 두 번 받는다. */}
        {PRELOADED_FONT_URLS.map((href) => (
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
