"use client";

import { useEffect, useLayoutEffect } from "react";

/** 키트 스크립트. React hydration이 끝난 뒤 붙여야 키트가 바꾼 DOM을 React가 되돌리지 않는다. */
const KIT_SCRIPTS = ["/assets/system.js", "/assets/motion/motion.js", "/assets/layout/layout.js"];

/** layout.tsx의 head 스크립트(KIT_HEAD_SCRIPT)가 `<html>`에 붙이는 class와 그 시각(ms) */
const KIT_ROOT_CLASSES = [
  { name: "m-enter", at: 0 },
  { name: "mo-js", at: 0 },
  { name: "m-enter-done", at: 700 },
  { name: "mo-safe", at: 2500 },
] as const;

/**
 * design-taste-frontend 키트의 module 스크립트(내비 시트, 히어로 등장, hover, moment)를 hydration 뒤에 붙인다.
 * 화면에 그리는 것은 없다.
 */
export function KitScripts() {
  // 개발 모드 Strict Mode 재마운트가 `<html>`에서 React가 모르는 class를 지우므로 head 스크립트의 class를 다시 붙인다.
  // 프로덕션에서는 이미 붙어 있어 아무 일도 없다(Next.js 16.4 문서 「Re-applying attributes in development」).
  useLayoutEffect(() => {
    const root = document.documentElement;
    const timers = KIT_ROOT_CLASSES.map(({ name, at }) =>
      at === 0 ? root.classList.add(name) : window.setTimeout(() => root.classList.add(name), at),
    );

    return () => {
      for (const timer of timers) if (timer) window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    for (const src of KIT_SCRIPTS) {
      if (document.querySelector(`script[src="${src}"]`)) continue;
      const script = document.createElement("script");
      script.type = "module";
      script.src = src;
      document.body.append(script);
    }
  }, []);

  return null;
}
