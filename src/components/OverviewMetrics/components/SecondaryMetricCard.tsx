import { Card, Typography } from "@tide-design/components";

import type { MetricValue } from "@/apis/overview.types";

import { ChangeBadge } from "./ChangeBadge";

export interface SecondaryMetricCardProps {
  label: string;
  metric: MetricValue;
  format: (value: number) => string;
}

/** 보조 지표 한 칸: 이름, 값, 증감률 */
export function SecondaryMetricCard({ label, metric, format }: SecondaryMetricCardProps) {
  return (
    <Card className="flex flex-col gap-2 p-5">
      <Typography variant="label-md" className="text-muted">
        {label}
      </Typography>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Typography variant="heading-md" render={<p />}>
          {format(metric.current)}
        </Typography>
        <ChangeBadge current={metric.current} previous={metric.previous} />
      </div>
    </Card>
  );
}
