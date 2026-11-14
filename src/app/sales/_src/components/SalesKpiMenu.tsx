"use client";

import { IconButton, Menu, MenuContent, MenuItem, MenuTrigger } from "@tide-design/components";
import { DownloadIcon, EllipsisIcon, EyeIcon } from "@tide-design/icons";

import { toasts } from "@/libs/toasts";

export interface SalesKpiMenuProps {
  /** KPI 이름. 버튼 이름과 Toast 문구에 쓴다. */
  label: string;
}

/** KPI 카드의 더보기 메뉴(자세히 보기, 내보내기). 동작은 목업이라 Toast만 띄운다. */
export function SalesKpiMenu({ label }: SalesKpiMenuProps) {
  return (
    <Menu>
      <MenuTrigger
        render={
          <IconButton aria-label={`${label} 더보기`} variant="ghost" color="neutral" size="sm">
            <EllipsisIcon />
          </IconButton>
        }
      />
      <MenuContent placement="bottom end">
        <MenuItem
          onClick={() =>
            toasts.add({
              title: `${label} 자세히 보기`,
              description: "목업이라 상세 화면은 없습니다.",
            })
          }
        >
          <EyeIcon /> 자세히 보기
        </MenuItem>
        <MenuItem
          onClick={() => toasts.add({ title: `${label}을(를) 내보냈습니다`, color: "success" })}
        >
          <DownloadIcon /> 내보내기
        </MenuItem>
      </MenuContent>
    </Menu>
  );
}
