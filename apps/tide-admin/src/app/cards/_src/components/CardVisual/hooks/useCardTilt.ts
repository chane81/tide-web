import { useEffect, useRef } from "react";
import type { PointerEvent } from "react";

/** 카드가 기우는 최대 각도(도) */
const MAX_TILT = 10;

/**
 * 마우스 위치를 따라 카드를 기울이고 빛 반사 위치를 옮긴다.
 * 값은 CSS 변수(`--pay-card-px`·`--pay-card-py`: 0~1)로만 넘기고, 각도·반사 모양은 CSS(`globals.css .pay-card`)가 정한다.
 * 터치·펜에서는 움직이지 않는다. 움직임 줄이기 설정이면 CSS가 기울기를 끈다.
 */
export function useCardTilt<T extends HTMLElement>() {
  const frame = useRef(0);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function onPointerMove(event: PointerEvent<T>) {
    if (event.pointerType !== "mouse") return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const px = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
    const py = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);

    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--pay-card-px", px.toFixed(3));
      el.style.setProperty("--pay-card-py", py.toFixed(3));
      el.style.setProperty("--pay-card-rx", `${((0.5 - py) * MAX_TILT * 2).toFixed(2)}deg`);
      el.style.setProperty("--pay-card-ry", `${((px - 0.5) * MAX_TILT * 2).toFixed(2)}deg`);
    });
  }

  function onPointerLeave(event: PointerEvent<T>) {
    const el = event.currentTarget;
    cancelAnimationFrame(frame.current);
    for (const name of ["--pay-card-px", "--pay-card-py", "--pay-card-rx", "--pay-card-ry"]) {
      el.style.removeProperty(name);
    }
  }

  return { onPointerMove, onPointerLeave };
}
