"use client";

import { IconButton } from "@tide-design/components";
import { MenuIcon, XIcon } from "@tide-design/icons";
import { type ReactNode, useRef } from "react";

export interface MobileSidebarProps {
  /** 오버레이 안에 그릴 사이드바 */
  children: ReactNode;
}

/**
 * 좁은 화면용 오버레이 사이드바. tide에 Drawer가 없어 네이티브 `<dialog>`의 모달 동작
 * (포커스 가둠, Esc로 닫기, 바깥 inert, 닫으면 여는 버튼으로 포커스 복귀)을 쓴다.
 */
export function MobileSidebar({ children }: MobileSidebarProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <IconButton
        aria-label="메뉴 열기"
        variant="ghost"
        color="neutral"
        onClick={() => dialogRef.current?.showModal()}
      >
        <MenuIcon />
      </IconButton>
      {/* 바깥 누름은 마우스 전용 보조 동작이다. 키보드는 브라우저 기본 Esc로 닫히고, 링크는 Enter로 눌러도 click이 난다. */}
      {/* oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <dialog
        ref={dialogRef}
        aria-label="메뉴"
        className="m-0 h-dvh max-h-none w-72 max-w-[85vw] border-e border-default bg-surface text-default backdrop:bg-overlay"
        onClick={(event) => {
          const target = event.target as Element;
          // 바깥(backdrop)을 누르면 target이 대화상자 자신이다. 메뉴 링크를 누르면 다른 화면으로 가므로 닫는다.
          if (target === event.currentTarget || target.closest("a")) event.currentTarget.close();
        }}
      >
        <div className="absolute top-3 right-3 z-1">
          <IconButton
            aria-label="메뉴 닫기"
            variant="ghost"
            color="neutral"
            size="sm"
            onClick={() => dialogRef.current?.close()}
          >
            <XIcon />
          </IconButton>
        </div>
        {children}
      </dialog>
    </>
  );
}
