import type { ReactNode } from "react";

/** 팔레트에서 고를 수 있는 이동 대상 하나 */
export interface Command {
  href: string;
  label: string;
  /** 이름 앞 아이콘(장식용) */
  icon: ReactNode;
  /** 속한 메뉴 묶음 이름. 묶음 이름으로도 찾을 수 있다. */
  group?: string;
}
