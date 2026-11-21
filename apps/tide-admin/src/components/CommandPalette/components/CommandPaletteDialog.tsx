"use client";

import { Dialog, DialogContent, DialogTitle } from "@tide-design/components";

import type { Command } from "../types";
import { CommandPaletteSearch } from "./CommandPaletteSearch";

export interface CommandPaletteDialogProps {
  open: boolean;
  commands: Command[];
  onClose: () => void;
}

/** 팔레트 팝업. 내용은 열릴 때만 그려서 다시 열면 검색어가 비어 있다. */
export function CommandPaletteDialog({ open, commands, onClose }: CommandPaletteDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      {open && (
        <DialogContent>
          <DialogTitle className="sr-only">페이지 이동</DialogTitle>
          <CommandPaletteSearch commands={commands} onClose={onClose} />
        </DialogContent>
      )}
    </Dialog>
  );
}
