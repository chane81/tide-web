import { Badge, Card, Progress, Typography } from "@tide-design/components";

import { SAMPLE_MRR_GOAL } from "../constants/windowSample";

/**
 * 히어로 창 오른쪽 아래 모서리에 겹쳐 뜨는 작은 지표 카드(키트 `.at-over`와 같은 자리: 창 아래 오른 모서리).
 * tide에 차트가 없어 MRR 추이는 Progress와 Badge로 그린다. 1280px 아래에서는 숨긴다(globals.css `.hero-over`).
 * 창과 같은 견본이라 스크린 리더에는 바깥 role="img"가 한꺼번에 알린다.
 */
export function HeroOverCard() {
  return (
    <div className="hero-over" data-ui="" aria-hidden="true">
      <Card className="flex flex-col gap-3">
        <span className="flex items-center justify-between gap-3">
          <span className="text-label-sm text-muted">이번 달 MRR</span>
          <Badge size="sm" variant="faint" color="success">
            {SAMPLE_MRR_GOAL.change}
          </Badge>
        </span>
        <Typography variant="heading-sm" render={<span />}>
          {SAMPLE_MRR_GOAL.value}
        </Typography>
        <Progress value={SAMPLE_MRR_GOAL.percent} size="sm" aria-label="MRR 목표 달성률" />
        <span className="text-label-sm text-muted">
          목표 {SAMPLE_MRR_GOAL.goal}의 {SAMPLE_MRR_GOAL.percent}%
        </span>
      </Card>
    </div>
  );
}
