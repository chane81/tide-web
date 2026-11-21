import { BrandMark } from "@/components/BrandMark";
import NextLink from "next/link";
import type { ReactNode } from "react";

import { AppToastRegion } from "./components/AppToastRegion";
import { MobileSidebar } from "./components/MobileSidebar";

export interface AppShellProps {
  /** 넓은 화면에서는 왼쪽에 고정, 좁은 화면에서는 오버레이로 여는 사이드바 */
  sidebar: ReactNode;
  children: ReactNode;
}

/** 모든 화면을 감싸는 셸: 사이드바, 좁은 화면 상단 바, 본문, Toast 영역 */
export function AppShell({ sidebar, children }: AppShellProps) {
  return (
    <div className="flex min-h-dvh">
      <aside className="sticky top-0 hidden h-dvh w-72 shrink-0 border-e border-default bg-surface lg:block">
        {sidebar}
      </aside>
      <div className="flex min-w-0 flex-1 flex-col bg-neutral-faint">
        <header className="sticky top-0 z-sticky flex h-14 items-center gap-2 border-b border-default bg-surface px-3 lg:hidden">
          <MobileSidebar>{sidebar}</MobileSidebar>
          <NextLink
            href="/"
            className="flex items-center gap-2 rounded-md px-1 text-heading-xs focus-visible:focus-ring"
          >
            <BrandMark size={24} />
            tide-web
          </NextLink>
        </header>
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-8">{children}</main>
      </div>
      <AppToastRegion />
    </div>
  );
}
