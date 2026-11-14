import {
  ChartLineIcon,
  CreditCardIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  SettingsIcon,
  UsersIcon,
} from "@tide-design/icons";

import type { NavItem } from "@/components/Sidebar";

/** 사이드바 주 메뉴. 배지 숫자는 목업이다. */
export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "개요", icon: <LayoutDashboardIcon /> },
  { href: "/sales", label: "매출", icon: <ChartLineIcon /> },
  { href: "/cards", label: "카드", icon: <CreditCardIcon />, badge: 2 },
  { href: "/customers", label: "고객", icon: <UsersIcon />, badge: 12 },
];

/** 사이드바 아래쪽 보조 메뉴 */
export const FOOTER_NAV_ITEMS: NavItem[] = [
  {
    href: "https://github.com/chane81/tide-design-system/issues",
    label: "지원",
    icon: <LifeBuoyIcon />,
  },
  { href: "/settings", label: "설정", icon: <SettingsIcon /> },
];
