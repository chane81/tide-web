import { Progress, Skeleton } from "@tide-design/components";

/** 움직임 견본: 움직임 줄이기 설정을 읽는 미디어 쿼리와, 그때도 뜻이 남는 Component */
export function MotionPanel() {
  return (
    <div className="access-panel">
      <code className="font-mono text-body-sm">@media (prefers-reduced-motion: reduce)</code>
      <div className="flex flex-col gap-3" aria-hidden="true">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <Progress aria-label="업로드 진행" value={64} />
    </div>
  );
}
