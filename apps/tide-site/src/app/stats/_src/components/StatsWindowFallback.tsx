import { Skeleton, VisuallyHidden } from "@tide-design/components";

import { StatsFrame } from "./StatsFrame";

/** npm에서 읽는 동안 프리렌더 셸에 들어가는 창. 표 세 줄 자리를 tide Skeleton으로 채운다. */
export function StatsWindowFallback() {
  return (
    <StatsFrame>
      <div className="stats-win__loading" aria-busy="true">
        <Skeleton className="h-6 w-40" />
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-10 w-full" />
        ))}
        <VisuallyHidden>npm에서 패키지 정보를 읽는 중입니다.</VisuallyHidden>
      </div>
    </StatsFrame>
  );
}
