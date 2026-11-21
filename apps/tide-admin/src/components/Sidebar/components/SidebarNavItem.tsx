"use client";

import { Badge, Button } from "@tide-design/components";
import { cn } from "@tide-web/libs";
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

/**
 * 사이드바 메뉴 한 줄. 현재 경로면 강조하고 `aria-current="page"`를 붙인다.
 * tide `Button`(ghost·neutral)을 Next `Link`로 렌더한다. hover·누름 배경과 포커스 링은 Button 것을 쓴다.
 * tide에 블록형 내비게이션 링크가 없어 왼쪽 정렬·흐린 글자·활성 배경은 className으로 덮어쓴다(docs/tide-gaps.md).
 */
export function SidebarNavItem({ item }: SidebarNavItemProps) {
  const pathname = usePathname();
  const external = /^https?:\/\//.test(item.href);
  const active = !external && isActive(item.href, pathname);

  return (
    <li>
      <Button
        variant="ghost"
        color="neutral"
        size="sm"
        noPressScale
        startIcon={item.icon}
        aria-current={active ? "page" : undefined}
        render={
          <NextLink
            href={item.href}
            {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
          />
        }
        className={cn(
          "h-9 w-full justify-start gap-3 text-muted",
          active && "bg-active text-default",
        )}
      >
        <span className="flex-1 truncate text-start">{item.label}</span>
        {item.badge !== undefined && (
          <Badge size="sm" variant="subtle" color="primary">
            {item.badge}
          </Badge>
        )}
      </Button>
    </li>
  );
}
