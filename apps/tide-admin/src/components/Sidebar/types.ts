import type { ReactNode } from "react";

/** 페이지로 이동하는 사이드바 메뉴 */
export interface NavLinkItem {
  /** 이동할 경로. 바깥 주소(`https://…`)면 새 탭으로 연다. */
  href: string;
  /** 보이는 이름 */
  label: string;
  /** 이름 앞 아이콘(장식용). 서버에서 그린 요소를 넘긴다. */
  icon: ReactNode;
  /** 이름 뒤 숫자 배지 */
  badge?: number;
  /** 경로가 정확히 같을 때만 활성으로 본다. 형제 메뉴가 이 경로의 하위일 때 쓴다. */
  exact?: boolean;
}

/** 자기 페이지 없이 하위 메뉴를 펼치는 사이드바 메뉴(2depth) */
export interface NavGroupItem {
  label: string;
  icon: ReactNode;
  children: NavLinkItem[];
}

/** 사이드바 메뉴 항목 하나 */
export type NavItem = NavLinkItem | NavGroupItem;

/** 사이드바 아래쪽 유저 카드에 보이는 사람 */
export interface SidebarUser {
  name: string;
  email: string;
  avatarUrl?: string;
}
