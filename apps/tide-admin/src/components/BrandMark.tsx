"use client";

// client인 이유: 서버가 사이드바를 한 번 렌더해 데스크톱 aside와 모바일 dialog 두 자리에 끼우므로,
// 서버 컴포넌트면 useId가 같아 그라디언트·마스크 id가 겹치고 숨은 쪽 정의를 참조해 그림이 빠진다.
// client 컴포넌트는 놓인 자리마다 따로 만들어져 id가 갈린다.
import { useId } from "react";

export interface BrandMarkProps {
  size?: number;
}

const SMALL_DROP =
  "M10.5 12.73C11.97 15.25 14.7 17.77 14.7 20.5A4.2 4.2 0 0 1 6.3 20.5C6.3 17.77 9.03 15.25 10.5 12.73Z";
const BIG_DROP =
  "M19 6.05C21.45 10.25 26 14.45 26 19A7 7 0 0 1 12 19C12 14.45 16.55 10.25 19 6.05Z";

/**
 * tide-web 대표 마크: 파란 둥근 사각형 위 채운 물방울 두 개. 파비콘(`src/app/icon.svg`)과 같은 그림이다.
 * 두 물방울 사이는 큰 물방울을 작은 물방울 윤곽만큼 파낸 틈이라 바탕이 비친다.
 * 페이지 안이라 색은 tide CSS 변수로 칠한다(ADR 0002). 장식이라 스크린 리더에서 숨긴다(옆에 이름 글자가 있다).
 */
export function BrandMark({ size = 28 }: BrandMarkProps) {
  // 한 화면에 여럿이어도 id가 겹치지 않게 한다. 특수 문자는 url(#id) 참조를 깨뜨려 걸러 낸다.
  const id = `brand${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" className="shrink-0">
      <defs>
        <linearGradient id={`${id}-tile`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--tide-color-blue-500)" }} />
          <stop offset="1" style={{ stopColor: "var(--tide-color-blue-700)" }} />
        </linearGradient>
        {/* 마스크는 밝기만 본다: 흰 곳은 남기고 검은 곳(작은 물방울 + 틈)은 파낸다. */}
        <mask id={`${id}-gap`}>
          <rect width="32" height="32" fill="white" />
          <path
            d={SMALL_DROP}
            fill="black"
            stroke="black"
            strokeWidth={3.2}
            strokeLinejoin="round"
          />
        </mask>
      </defs>
      <rect width="32" height="32" rx="8" fill={`url(#${id}-tile)`} />
      <path style={{ fill: "var(--tide-color-white)" }} mask={`url(#${id}-gap)`} d={BIG_DROP} />
      <path style={{ fill: "var(--tide-color-blue-200)" }} d={SMALL_DROP} />
    </svg>
  );
}
