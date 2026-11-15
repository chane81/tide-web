"use client";

import type { JSX } from "react";

export interface InlineScriptProps {
  /** HTML을 읽는 중에 바로 실행할 스크립트 본문 */
  html: string;
}

/**
 * hydration 전에 실행되는 인라인 스크립트. 서버 HTML에서는 `text/javascript`로 실행되고,
 * 클라이언트 렌더에서는 `text/plain`이라 React의 script 경고가 나지 않는다.
 * 근거: Next.js 16.4 문서 `preventing-flash-before-hydration.md`(InlineScript).
 * client 컴포넌트여야 한다. 서버 컴포넌트면 `typeof window`를 서버에서만 계산해 client도 `text/javascript`를 받고,
 * 개발 모드에서 "Encountered a script tag" 오류가 난다(문서 예제도 client 컴포넌트 안에서 쓴다).
 */
export function InlineScript({ html }: InlineScriptProps): JSX.Element {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
