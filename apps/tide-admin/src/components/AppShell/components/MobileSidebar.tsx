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
 *
 * 움직임: 열 때는 `@starting-style`(`starting:`)에서 시작해 패널이 왼쪽에서 밀려 들어오고 backdrop이 서서히 짙어진다.
 * 닫을 때는 `close()`를 바로 부르면 top layer에서 즉시 빠져 트랜지션이 안 보이므로,
 * `data-closing`을 붙여 닫힌 모양으로 트랜지션한 뒤 끝나면 `close()`한다. 동작 줄이기 설정이면 트랜지션 없이 바로 닫힌다.
 */
export function MobileSidebar({ children }: MobileSidebarProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const close = () => {
    const dialog = dialogRef.current;
    if (!dialog?.open || dialog.hasAttribute("data-closing")) return;
    dialog.setAttribute("data-closing", "");
    // getAnimations()가 스타일을 다시 계산해 data-closing 트랜지션까지 돌려준다. 트랜지션이 없으면 바로 닫힌다.
    void Promise.allSettled(dialog.getAnimations().map((animation) => animation.finished)).then(
      () => {
        dialog.removeAttribute("data-closing");
        dialog.close();
      },
    );
  };

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
      {/* 바깥 누름은 마우스 전용 보조 동작이다. 키보드는 Esc(cancel)로 닫히고, 링크는 Enter로 눌러도 click이 난다. */}
      {/* oxlint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <dialog
        ref={dialogRef}
        aria-label="메뉴"
        className="m-0 h-dvh max-h-none w-72 max-w-[85vw] border-e border-default bg-surface text-default transition-transform duration-(--tide-duration-normal) ease-out backdrop:bg-overlay backdrop:transition-opacity backdrop:duration-(--tide-duration-normal) backdrop:ease-out starting:-translate-x-full starting:backdrop:opacity-0 data-closing:-translate-x-full data-closing:backdrop:opacity-0 motion-reduce:transition-none motion-reduce:backdrop:transition-none"
        onCancel={(event) => {
          // Esc도 같은 닫힘 트랜지션을 거친다.
          event.preventDefault();
          close();
        }}
        onClick={(event) => {
          const target = event.target as Element;
          // 바깥(backdrop)을 누르면 target이 대화상자 자신이다. 메뉴 링크를 누르면 다른 화면으로 가므로 닫는다.
          if (target === event.currentTarget || target.closest("a")) close();
        }}
      >
        <div className="absolute top-3 right-3 z-1">
          <IconButton
            aria-label="메뉴 닫기"
            variant="ghost"
            color="neutral"
            size="sm"
            onClick={close}
          >
            <XIcon />
          </IconButton>
        </div>
        {children}
      </dialog>
    </>
  );
}
