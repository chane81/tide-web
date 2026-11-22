import { Card, Typography } from "@tide-design/components";

import { ChangeBadge } from "@/components/ChangeBadge";
import { Sparkline } from "@/components/Sparkline";
import type { SeriesColor } from "@/constants/chartTheme";
import type { MetricValue } from "@/types/metric";

import type { SeriesPoint } from "../../../apis/overview.types";

export interface SecondaryMetricCardProps {
  label: string;
  metric: MetricValue;
  /** 기간 안의 추이. 오른쪽 스파크라인으로 그린다. */
  series: SeriesPoint[];
  format: (value: number) => string;
  /** 증감 비교 기준(「12개월 전 대비」 등) */
  compareLabel: string;
  /** 기간 이름(「12개월」 등). 스파크라인의 스크린 리더용 이름에 쓴다. */
  periodLabel: string;
  /** 스파크라인 색 */
  color?: SeriesColor;
}

/** 보조 지표 한 칸: 이름, 값, 증감률과 비교 기준, 오른쪽에 추이 스파크라인. 매출 KPI 카드와 같은 순서로 쌓는다. */
export function SecondaryMetricCard({
  label,
  metric,
  series,
  format,
  compareLabel,
  periodLabel,
  color,
}: SecondaryMetricCardProps) {
  return (
    <Card className="flex flex-col gap-2 p-5 shadow-sm">
      <Typography variant="label-md" className="text-muted">
        {label}
      </Typography>
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
        <div className="flex flex-col gap-2">
          <Typography variant="heading-md" render={<p />}>
            {format(metric.current)}
          </Typography>
          <div className="flex flex-wrap items-center gap-2">
            <ChangeBadge current={metric.current} previous={metric.previous} />
            <Typography variant="body-sm" className="text-muted">
              {compareLabel}
            </Typography>
          </div>
        </div>
        {/* 숫자 옆 빈자리를 추이로 채운다. 좁으면 아래 줄로 내려가 폭을 다 쓴다. */}
        <div className="min-w-24 flex-1 basis-24 xl:max-w-40">
          <Sparkline
            title={`최근 ${periodLabel} ${label} 추이`}
            values={series.map((point) => point.value)}
            color={color}
            height={44}
          />
        </div>
      </div>
    </Card>
  );
}
