import type { NpmPackagesSummary } from "../libs/summarizeNpmPackages";

export interface StatsNoteProps {
  summary: NpmPackagesSummary;
}

/**
 * 창 왼쪽 아래에 겹치는 작은 카드(키트 hero--collage의 `ly-piece--note`). 키트 layout.js가 `data-ly-steps`로
 * 다 그린 모습을 먼저 보이고, 세 줄을 0.7초 간격으로 다시 들인다(폰에서는 키트가 숨긴다).
 */
export function StatsNote({ summary }: StatsNoteProps) {
  return (
    <div className="ly-piece stats-note" data-ly-steps="700">
      <p className="text-label-md text-muted">지난 7일 합계</p>
      <p className="stats-note__total" data-step>
        {summary.total ?? "읽지 못함"}
      </p>
      {summary.period ? (
        <p className="text-body-sm text-muted" data-step>
          {summary.period}
        </p>
      ) : null}
      {summary.sharedVersion ? (
        <p className="text-body-sm" data-step>
          세 패키지 모두 {summary.sharedVersion}
        </p>
      ) : null}
    </div>
  );
}
