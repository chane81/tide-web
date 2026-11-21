"use client";

/* oxlint-disable jsx-a11y/prefer-tag-over-role -- 네이티브 select·datalist는 아이콘이 있는 행과 활성 표시를 그릴 수 없다. */

import { DialogHeader, Input } from "@tide-design/components";
import { SearchIcon } from "@tide-design/icons";
import { cn } from "@tide-web/libs";
import { useRouter } from "next/navigation";
import { type KeyboardEvent, useEffect, useId, useRef, useState } from "react";

import { isExternalHref } from "@/components/Sidebar/libs/navHref";

import { filterCommands } from "../libs/commands";
import type { Command } from "../types";

/** 활성 항목이 목록 밖이면 보이는 곳으로 옮긴다. */
const scrollIntoNearest = (element: HTMLDivElement | null) => {
  element?.scrollIntoView?.({ block: "nearest" });
};

export interface CommandPaletteSearchProps {
  commands: Command[];
  onClose: () => void;
}

/**
 * 검색 입력과 결과 목록(ARIA combobox). 포커스는 입력에 두고 ↑↓로 활성 항목을 옮긴다.
 * tide `Combobox`는 입력 전에 목록을 열 수 없어 tide `Input`으로 조립한다(docs/tide-gaps.md).
 */
export function CommandPaletteSearch({ commands, onClose }: CommandPaletteSearchProps) {
  const router = useRouter();
  const listId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const results = filterCommands(commands, query);
  const active = results[activeIndex];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function run(command: Command) {
    onClose();
    if (isExternalHref(command.href)) window.open(command.href, "_blank", "noopener,noreferrer");
    else router.push(command.href);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    // 한글 조합 중 키는 조합을 끝내는 데 쓴다.
    if (event.nativeEvent.isComposing || results.length === 0) return;

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => (index + 1) % results.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => (index - 1 + results.length) % results.length);
    } else if (event.key === "Enter" && active) {
      event.preventDefault();
      run(active);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <DialogHeader align="center">
        <div className="relative">
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
          <Input
            ref={inputRef}
            role="combobox"
            aria-label="이동할 페이지 검색"
            aria-autocomplete="list"
            aria-expanded={results.length > 0}
            aria-controls={listId}
            aria-activedescendant={active ? `${listId}-${activeIndex}` : undefined}
            autoComplete="off"
            placeholder="페이지 검색"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={handleKeyDown}
            className="ps-9"
          />
        </div>
      </DialogHeader>
      <div
        id={listId}
        role="listbox"
        aria-label="이동할 페이지"
        className="flex max-h-80 flex-col gap-1 overflow-y-auto"
      >
        {results.map((command, index) => (
          // 키보드는 입력의 onKeyDown이 맡는다(combobox 패턴). 항목에는 포커스를 주지 않는다.
          // oxlint-disable-next-line jsx-a11y/click-events-have-key-events
          <div
            key={command.href}
            ref={index === activeIndex ? scrollIntoNearest : undefined}
            id={`${listId}-${index}`}
            role="option"
            tabIndex={-1}
            aria-selected={index === activeIndex}
            onMouseMove={() => setActiveIndex(index)}
            onMouseDown={(event) => event.preventDefault()}
            onClick={() => run(command)}
            className={cn(
              "flex h-9 shrink-0 cursor-pointer items-center gap-3 rounded-md px-3 text-label-md text-muted",
              index === activeIndex && "bg-active text-default",
            )}
          >
            <span aria-hidden="true" className="inline-flex size-4 shrink-0 *:size-full">
              {command.icon}
            </span>
            <span className="flex-1 truncate">{command.label}</span>
            {command.group && <span className="text-caption text-muted">{command.group}</span>}
          </div>
        ))}
      </div>
      {results.length === 0 && (
        <output className="block px-3 py-6 text-center text-body-sm text-muted">
          검색 결과가 없습니다
        </output>
      )}
    </div>
  );
}
