import type { NavItem } from "@/components/Sidebar";

import type { Command } from "../types";

const normalize = (text: string) => text.normalize("NFC").toLowerCase().replace(/\s+/g, "");

/** 사이드바 메뉴를 이동 대상 목록으로 편다. 페이지가 없는 묶음은 빠지고 하위 메뉴에 이름만 남는다. */
export function flattenCommands(items: readonly NavItem[]): Command[] {
  return items.flatMap((item): Command[] =>
    "children" in item
      ? item.children.map(({ href, label, icon }) => ({ href, label, icon, group: item.label }))
      : [{ href: item.href, label: item.label, icon: item.icon }],
  );
}

/** 이름이나 묶음 이름에 검색어가 들어간 대상만 남긴다. 대소문자와 띄어쓰기는 보지 않는다. */
export function filterCommands(commands: readonly Command[], query: string): Command[] {
  const needle = normalize(query);
  if (!needle) return [...commands];

  return commands.filter(
    ({ label, group }) =>
      normalize(label).includes(needle) ||
      (group !== undefined && normalize(group).includes(needle)),
  );
}
