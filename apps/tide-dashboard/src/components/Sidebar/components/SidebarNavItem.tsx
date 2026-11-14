"use client";

import { Badge } from "@tide-design/components";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import type { NavItem } from "../types";

export interface SidebarNavItemProps {
  item: NavItem;
}

/** `/`는 정확히 같을 때만, 나머지는 하위 경로까지 활성으로 본다. */
function isActive(href: string, pathname: string) {
  if (href === "/") return pathname === "/";

  return pathname === href || pathname.startsWith(`${href}/`);
}

/** 사이드바 메뉴 한 줄. 현재 경로면 강조하고 `aria-current="page"`를 붙인다. */
export function SidebarNavItem({ item }: SidebarNavItemProps) {
  const pathname = usePathname();
  const external = /^https?:\/\//.test(item.href);
  const active = !external && isActive(item.href, pathname);

  return (
    <li>
      <NextLink
        href={item.href}
        aria-current={active ? "page" : undefined}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="flex h-9 items-center gap-3 rounded-md px-3 text-label-md text-muted transition-colors hover:bg-hover hover:text-default focus-visible:focus-ring aria-[current=page]:bg-active aria-[current=page]:text-default"
      >
        <span className="flex shrink-0">{item.icon}</span>
        <span className="flex-1 truncate">{item.label}</span>
        {item.badge !== undefined && (
          <Badge size="sm" variant="faint">
            {item.badge}
          </Badge>
        )}
      </NextLink>
    </li>
  );
}
