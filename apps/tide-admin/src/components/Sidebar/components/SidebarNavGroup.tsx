"use client";

import { Button } from "@tide-design/components";
import { ChevronDownIcon } from "@tide-design/icons";
import { cn } from "@tide-web/libs";
import { usePathname } from "next/navigation";
import { useId, useState } from "react";

import { NAV_ROW_ACTIVE_CLASS, NAV_ROW_CLASS } from "../constants/navRowClass";
import { isNavHrefActive } from "../libs/navHref";
import type { NavGroupItem } from "../types";
import { SidebarNavLink } from "./SidebarNavLink";

export interface SidebarNavGroupProps {
  item: NavGroupItem;
}

/**
 * 하위 메뉴가 있는 2depth 메뉴. 줄 전체가 펼침 버튼이다.
 * 접힌 안쪽에 현재 페이지가 있으면 위치를 잃지 않게 강조한다.
 * tide `Accordion` 패널은 `hidden`으로 접혀 높이 애니메이션을 줄 수 없어 Button으로 조립한다(docs/tide-gaps.md).
 */
export function SidebarNavGroup({ item }: SidebarNavGroupProps) {
  const pathname = usePathname();
  const panelId = useId();
  const [expanded, setExpanded] = useState(true);
  const childActive = item.children.some((child) =>
    isNavHrefActive(child.href, pathname, child.exact),
  );
  const highlighted = !expanded && childActive;

  return (
    <>
      <Button
        variant="ghost"
        color="neutral"
        size="sm"
        noPressScale
        startIcon={item.icon}
        endIcon={
          <ChevronDownIcon
            className={cn(
              "motion-safe:transition-transform motion-safe:duration-normal motion-safe:ease-in-out",
              { "-rotate-90": !expanded },
            )}
          />
        }
        aria-expanded={expanded}
        aria-controls={panelId}
        onClick={() => setExpanded((current) => !current)}
        className={cn(NAV_ROW_CLASS, highlighted && NAV_ROW_ACTIVE_CLASS)}
      >
        <span className="flex-1 truncate text-start">{item.label}</span>
      </Button>
      {/* 높이를 모르는 내용도 움직이도록 grid 행을 0fr ↔ 1fr로 바꾸고, 목록은 같은 시간에 위에서 아래로 민다. 접히면 inert로 포커스와 보조기기에서 뺀다. */}
      <div
        id={panelId}
        inert={!expanded}
        className={cn(
          "grid motion-safe:transition-[grid-template-rows] motion-safe:duration-normal motion-safe:ease-in-out",
          expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        {/* 음수 여백과 ul의 여백은 overflow에 포커스 링이 잘리지 않게 하는 자리다. */}
        <div className="-mx-1 min-h-0 overflow-hidden">
          <ul
            className={cn(
              "m-1 ms-6 flex flex-col gap-1 border-s border-default ps-2 motion-safe:transition-transform motion-safe:duration-normal motion-safe:ease-in-out",
              expanded ? "translate-y-0" : "-translate-y-full",
            )}
          >
            {item.children.map((child) => (
              <li key={child.href}>
                <SidebarNavLink item={child} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
