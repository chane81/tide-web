import { Separator } from "@tide-design/components";
import { DropletsIcon } from "@tide-design/icons";
import NextLink from "next/link";

import { SidebarAnnouncement } from "./components/SidebarAnnouncement";
import { SidebarNavItem } from "./components/SidebarNavItem";
import { SidebarSearch } from "./components/SidebarSearch";
import { SidebarUserMenu } from "./components/SidebarUserMenu";
import type { NavItem, SidebarUser } from "./types";

export interface SidebarProps {
  /** 위쪽 주 메뉴 */
  items: NavItem[];
  /** 아래쪽 보조 메뉴(지원, 설정 등) */
  footerItems: NavItem[];
  user: SidebarUser;
}

/**
 * 앱 내비게이션 사이드바. tide에 Sidebar가 없어 tide Input·Badge·Card·Avatar·Menu로 조립한다.
 * 서버 컴포넌트이고, 상태가 필요한 조각(메뉴 활성, 공지 닫기, 계정 메뉴)만 client다.
 */
export function Sidebar({ items, footerItems, user }: SidebarProps) {
  return (
    <div className="flex h-full flex-col gap-5 overflow-y-auto p-4">
      <NextLink
        href="/"
        className="flex items-center gap-2 rounded-md px-2 py-1 text-heading-xs focus-visible:focus-ring"
      >
        <DropletsIcon size={24} className="text-primary" />
        tide-web
      </NextLink>

      <SidebarSearch />

      <nav aria-label="주 메뉴">
        <ul className="flex flex-col gap-1">
          {items.map((item) => (
            <SidebarNavItem key={item.href} item={item} />
          ))}
        </ul>
      </nav>

      <div className="mt-auto flex flex-col gap-4">
        <nav aria-label="보조 메뉴">
          <ul className="flex flex-col gap-1">
            {footerItems.map((item) => (
              <SidebarNavItem key={item.href} item={item} />
            ))}
          </ul>
        </nav>
        <SidebarAnnouncement />
        <Separator />
        <SidebarUserMenu user={user} />
      </div>
    </div>
  );
}
