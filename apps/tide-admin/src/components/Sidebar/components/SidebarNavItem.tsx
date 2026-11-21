import type { NavItem } from "../types";
import { SidebarNavGroup } from "./SidebarNavGroup";
import { SidebarNavLink } from "./SidebarNavLink";

export interface SidebarNavItemProps {
  item: NavItem;
}

/** 사이드바 메뉴 한 항목. 하위 메뉴가 있으면 2depth 묶음으로 그린다. */
export function SidebarNavItem({ item }: SidebarNavItemProps) {
  return (
    <li>{"children" in item ? <SidebarNavGroup item={item} /> : <SidebarNavLink item={item} />}</li>
  );
}
