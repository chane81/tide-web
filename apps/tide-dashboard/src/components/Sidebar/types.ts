import type { ReactNode } from "react";

/** 사이드바 메뉴 항목 하나 */
export interface NavItem {
  /** 이동할 경로. 바깥 주소(`https://…`)면 새 탭으로 연다. */
  href: string;
  /** 보이는 이름 */
  label: string;
  /** 이름 앞 아이콘(장식용). 서버에서 그린 요소를 넘긴다. */
  icon: ReactNode;
  /** 이름 뒤 숫자 배지 */
  badge?: number;
}

/** 사이드바 아래쪽 유저 카드에 보이는 사람 */
export interface SidebarUser {
  name: string;
  email: string;
  avatarUrl?: string;
}
