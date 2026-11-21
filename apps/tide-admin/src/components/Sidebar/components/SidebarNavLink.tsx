"use client";

import { Badge, Button } from "@tide-design/components";
import { cn } from "@tide-web/libs";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ROW_ACTIVE_CLASS, NAV_ROW_CLASS } from "../constants/navRowClass";
import { isExternalHref, isNavHrefActive } from "../libs/navHref";
import type { NavLinkItem } from "../types";

export interface SidebarNavLinkProps {
  item: NavLinkItem;
}

/**
 * 사이드바 메뉴 링크 한 줄. 현재 경로면 강조하고 `aria-current="page"`를 붙인다.
 * tide `Button`(ghost·neutral)을 Next `Link`로 렌더한다. hover·누름 배경과 포커스 링은 Button 것을 쓴다.
 * tide에 블록형 내비게이션 링크가 없어 왼쪽 정렬·흐린 글자·활성 배경은 className으로 덮어쓴다(docs/tide-gaps.md).
 */
export function SidebarNavLink({ item }: SidebarNavLinkProps) {
  const pathname = usePathname();
  const external = isExternalHref(item.href);
  const active = isNavHrefActive(item.href, pathname, item.exact);

  return (
    <Button
      variant="ghost"
      color="neutral"
      size="sm"
      noPressScale
      startIcon={item.icon}
      aria-current={active ? "page" : undefined}
      render={
        <NextLink href={item.href} {...(external ? { target: "_blank", rel: "noreferrer" } : {})} />
      }
      className={cn(NAV_ROW_CLASS, active && NAV_ROW_ACTIVE_CLASS)}
    >
      <span className="flex-1 truncate text-start">{item.label}</span>
      {item.badge !== undefined && (
        <Badge size="sm" variant="subtle" color="primary" shape="rounded">
          {item.badge}
        </Badge>
      )}
    </Button>
  );
}
