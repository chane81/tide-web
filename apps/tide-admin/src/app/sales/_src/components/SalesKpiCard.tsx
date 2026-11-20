import { Card, Typography } from "@tide-design/components";

import { ChangeBadge } from "@/components/ChangeBadge";
import type { MetricValue } from "@/types/metric";

import { SalesKpiMenu } from "./SalesKpiMenu";

export interface SalesKpiCardProps {
  label: string;
  metric: MetricValue;
  format: (value: number) => string;
}

/** KPI 한 장: 이름·더보기 메뉴, 값, 어제 대비 증감 */
export function SalesKpiCard({ label, metric, format }: SalesKpiCardProps) {
  return (
    <Card render={<li />} className="flex flex-col gap-3 p-5">
      <div className="flex items-center justify-between gap-2">
        <Typography variant="label-md" className="text-muted">
          {label}
        </Typography>
        <SalesKpiMenu label={label} />
      </div>
      <Typography variant="heading-lg" render={<p />}>
        {format(metric.current)}
      </Typography>
      <div className="flex items-center gap-2">
        <ChangeBadge current={metric.current} previous={metric.previous} />
        <Typography variant="body-sm" className="text-muted">
          어제 대비
        </Typography>
      </div>
    </Card>
  );
}
