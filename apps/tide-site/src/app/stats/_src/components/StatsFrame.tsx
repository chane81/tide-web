import type { ReactNode } from "react";

export interface StatsFrameProps {
  children: ReactNode;
}

/**
 * npm 현황 창의 틀(키트 hero--collage의 `ly-piece--main`). 창 틀 막대는 소개 페이지 히어로 창과 같은 class를 쓴다.
 * 데이터를 읽는 창과 읽는 동안의 fallback이 같은 틀을 써서 자리가 흔들리지 않는다.
 */
export function StatsFrame({ children }: StatsFrameProps) {
  return (
    <div className="ly-piece ly-piece--main stats-win">
      <div className="hero-win__bar">
        <span className="hero-win__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="text-label-md text-muted">npm · @tide-design</span>
      </div>
      <div className="stats-win__body">{children}</div>
    </div>
  );
}
