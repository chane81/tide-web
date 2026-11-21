"use client";

import { Button } from "@tide-design/components";
import { SearchIcon } from "@tide-design/icons";

import { useCommandPaletteContext } from "@/components/CommandPalette/hooks/useCommandPaletteContext";

/** 페이지 이동 팔레트를 여는 검색 모양 버튼. ⌘K(Ctrl+K)로도 열린다. */
export function SidebarSearch() {
  const { openPalette } = useCommandPaletteContext();

  return (
    <Button
      variant="outline"
      color="neutral"
      size="sm"
      noPressScale
      startIcon={<SearchIcon />}
      aria-haspopup="dialog"
      aria-keyshortcuts="Meta+K Control+K"
      onClick={openPalette}
      className="w-full justify-start text-muted"
    >
      <span className="flex-1 text-start">검색</span>
      <kbd className="rounded-sm border border-default px-1.5 text-caption text-muted">⌘K</kbd>
    </Button>
  );
}
