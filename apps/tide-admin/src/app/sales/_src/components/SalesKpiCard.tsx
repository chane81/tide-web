import { Card } from "@tide-design/components";

import { ChangeBadge } from "@/components/ChangeBadge";
import { Sparkline } from "@/components/Sparkline";
import type { MetricValue } from "@/types/metric";

import { SalesKpiMenu } from "./SalesKpiMenu";

export interface SalesKpiCardProps {
  label: string;
  metric: MetricValue;
  format: (value: number) => string;
  /** 오늘 시간대별 추이(시간 순서). 마지막 값이 `metric.current`다. */
  trend: number[];
}

/** KPI 한 장: 이름·더보기 메뉴, 값과 오늘 추이 스파크라인, 어제 대비 증감 */
export function SalesKpiCard({ label, metric, format, trend }: SalesKpiCardProps) {
  return (
    <Card render={<li />} className="flex flex-col gap-3 p-5 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <span className="text-label-md text-muted">{label}</span>
        <SalesKpiMenu label={label} />
      </div>
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col gap-3">
          <p className="text-heading-lg">{format(metric.current)}</p>
          <div className="flex items-center gap-2">
            <ChangeBadge current={metric.current} previous={metric.previous} />
            <p className="text-body-sm text-muted">어제 대비</p>
          </div>
        </div>
        {/* Sparkline은 부모 폭을 따라 늘어나므로 폭을 정해 준다. */}
        <div className="w-32 shrink-0">
          <Sparkline values={trend} title={`${label} 오늘 시간대별 추이`} height={56} />
        </div>
      </div>
    </Card>
  );
}
