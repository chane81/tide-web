"use client";

import {
  Avatar,
  Menu,
  MenuContent,
  MenuItem,
  MenuSection,
  MenuTrigger,
} from "@tide-design/components";
import { ChevronsUpDownIcon, LogOutIcon, SettingsIcon, UserIcon } from "@tide-design/icons";
import { useRouter } from "next/navigation";

import { toasts } from "@/libs/toasts";

import type { SidebarUser } from "../types";

export interface SidebarUserMenuProps {
  user: SidebarUser;
}

/** 유저 카드. 누르면 계정 메뉴(프로필, 설정, 로그아웃)가 열린다. */
export function SidebarUserMenu({ user }: SidebarUserMenuProps) {
  const router = useRouter();

  return (
    <Menu>
      <MenuTrigger
        aria-label={`${user.name} 계정 메뉴`}
        className="flex w-full items-center gap-3 rounded-md p-2 text-start transition-colors hover:bg-hover focus-visible:focus-ring data-open:bg-active"
      >
        <Avatar src={user.avatarUrl} alt="" size="sm" color="blue" />
        <span className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-label-md">{user.name}</span>
          <span className="truncate text-caption text-muted">{user.email}</span>
        </span>
        <ChevronsUpDownIcon className="shrink-0 text-muted" />
      </MenuTrigger>
      <MenuContent placement="top start">
        <MenuSection aria-label="계정">
          <MenuItem onClick={() => router.push("/settings")}>
            <UserIcon /> 프로필
          </MenuItem>
          <MenuItem onClick={() => router.push("/settings")}>
            <SettingsIcon /> 설정
          </MenuItem>
        </MenuSection>
        <MenuSection aria-label="세션">
          <MenuItem
            onClick={() =>
              toasts.add({
                title: "로그아웃했습니다",
                description: "목업이라 실제로 나가지는 않습니다.",
              })
            }
          >
            <LogOutIcon /> 로그아웃
          </MenuItem>
        </MenuSection>
      </MenuContent>
    </Menu>
  );
}
