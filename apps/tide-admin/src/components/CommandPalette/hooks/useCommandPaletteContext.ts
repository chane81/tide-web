"use client";

import { createContext, use } from "react";

export interface CommandPaletteContextValue {
  /** 팔레트를 연다 */
  openPalette: () => void;
}

export const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

/** 팔레트를 여는 함수를 읽는다. `CommandPalette` 안에서만 쓴다. */
export function useCommandPaletteContext(): CommandPaletteContextValue {
  const context = use(CommandPaletteContext);
  if (!context) throw new Error("useCommandPaletteContext는 CommandPalette 안에서 쓴다.");

  return context;
}
