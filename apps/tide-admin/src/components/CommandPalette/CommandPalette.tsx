"use client";

import { type ReactNode, useCallback, useMemo, useState } from "react";

import type { NavItem } from "@/components/Sidebar";

import { CommandPaletteDialog } from "./components/CommandPaletteDialog";
import { CommandPaletteContext } from "./hooks/useCommandPaletteContext";
import { useCommandPaletteShortcut } from "./hooks/useCommandPaletteShortcut";
import { flattenCommands } from "./libs/commands";

export interface CommandPaletteProps {
  /** 이동 대상이 될 메뉴 */
  items: NavItem[];
  /** 팔레트를 열 수 있는 앱 화면 */
  children: ReactNode;
}

/**
 * 페이지 이동 팔레트. 사이드바가 데스크톱·모바일 두 벌이라 팝업과 ⌘K는 앱에 하나만 둔다.
 * 모바일 메뉴(네이티브 `<dialog>`)는 top layer라 팔레트를 가리므로 열기 전에 닫는다.
 */
export function CommandPalette({ items, children }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const commands = useMemo(() => flattenCommands(items), [items]);

  const openPalette = useCallback(() => {
    document.querySelector<HTMLDialogElement>("dialog[open]")?.close();
    setOpen(true);
  }, []);
  const closePalette = useCallback(() => setOpen(false), []);
  const togglePalette = useCallback(() => {
    if (open) {
      setOpen(false);
      return;
    }
    // 다른 모달(고객 상세 등) 위에 겹쳐 열지 않는다.
    if (document.querySelector('[role="dialog"], [role="alertdialog"]')) return;
    openPalette();
  }, [open, openPalette]);

  useCommandPaletteShortcut(togglePalette);

  const context = useMemo(() => ({ openPalette }), [openPalette]);

  return (
    <CommandPaletteContext value={context}>
      {children}
      <CommandPaletteDialog open={open} commands={commands} onClose={closePalette} />
    </CommandPaletteContext>
  );
}
