import { Card, Typography } from "@tide-design/components";

import type { OverviewPeriod, OverviewPeriodMetrics } from "@/apis/overview.types";
import { TrendLineChart } from "@/components/TrendLineChart";
import { formatCurrency } from "@/libs/formatCurrency";

import { formatSeriesLabel } from "../libs/formatSeriesLabel";
import { ChangeBadge } from "./ChangeBadge";

export interface MrrCardProps {
  period: OverviewPeriod;
  metrics: OverviewPeriodMetrics;
  compareLabel: string;
}

const formatAxis = (value: number) => formatCurrency(value, { compact: true });

/** 핵심 지표 MRR: 큰 숫자, 증감률, 추이 차트 */
export function MrrCard({ period, metrics, compareLabel }: MrrCardProps) {
  const data = metrics.mrrSeries.map((point) => ({
    label: formatSeriesLabel(point.at, period),
    mrr: point.value,
  }));

  return (
    <Card
      render={<section aria-labelledby={`mrr-${period}`} />}
      className="flex flex-col gap-4 p-6"
    >
      <div className="flex flex-col gap-1">
        <Typography variant="label-md" id={`mrr-${period}`} className="text-muted">
          MRR
        </Typography>
        <div className="flex flex-wrap items-center gap-3">
          <Typography variant="display-md" render={<p />}>
            {formatCurrency(metrics.mrr.current)}
          </Typography>
          <ChangeBadge current={metrics.mrr.current} previous={metrics.mrr.previous} />
          <Typography variant="body-sm" className="text-muted">
            {compareLabel}
          </Typography>
        </div>
      </div>
      <TrendLineChart
        title="MRR 추이"
        data={data}
        xKey="label"
        series={[{ dataKey: "mrr", name: "MRR" }]}
        formatValue={formatCurrency}
        formatAxisValue={formatAxis}
      />
    </Card>
  );
}
