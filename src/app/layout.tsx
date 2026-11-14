import type { Metadata } from "next";

import { getCurrentUser } from "@/apis/currentUser.api";
import { AppShell } from "@/components/AppShell";
import { Sidebar } from "@/components/Sidebar";
import { FOOTER_NAV_ITEMS, NAV_ITEMS } from "@/constants/navItems";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: "tide-web", template: "%s · tide-web" },
  description: "tide 디자인 시스템으로 만든 대시보드",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();

  return (
    <html lang="ko">
      <body className="bg-canvas text-default">
        <AppShell
          sidebar={<Sidebar items={NAV_ITEMS} footerItems={FOOTER_NAV_ITEMS} user={user} />}
        >
          {children}
        </AppShell>
      </body>
    </html>
  );
}
