import { Card, Typography } from "@tide-design/components";

import { ChangeBadge } from "@/components/ChangeBadge";
import type { MetricValue } from "@/types/metric";

export interface SecondaryMetricCardProps {
  label: string;
  metric: MetricValue;
  format: (value: number) => string;
  /** 증감 비교 기준(「12개월 전 대비」 등) */
  compareLabel: string;
}

/** 보조 지표 한 칸: 이름, 값, 증감률과 비교 기준. 매출 KPI 카드와 같은 순서로 쌓는다. */
export function SecondaryMetricCard({
  label,
  metric,
  format,
  compareLabel,
}: SecondaryMetricCardProps) {
  return (
    <Card className="flex flex-col gap-2 p-5">
      <Typography variant="label-md" className="text-muted">
        {label}
      </Typography>
      <Typography variant="heading-md" render={<p />}>
        {format(metric.current)}
      </Typography>
      <div className="flex flex-wrap items-center gap-2">
        <ChangeBadge current={metric.current} previous={metric.previous} />
        <Typography variant="body-sm" className="text-muted">
          {compareLabel}
        </Typography>
      </div>
    </Card>
  );
}
