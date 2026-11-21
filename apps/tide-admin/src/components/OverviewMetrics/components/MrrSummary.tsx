import { Typography } from "@tide-design/components";

import type { OverviewPeriod, OverviewPeriodMetrics } from "@/apis/overview.types";
import { ChangeBadge } from "@/components/ChangeBadge";
import { TrendLineChart } from "@/components/TrendLineChart";
import { formatCurrency } from "@/libs/formatCurrency";
import { formatSeriesLabel } from "@/libs/formatSeriesLabel";

import { PERIOD_UNIT } from "../constants/periods";

export interface MrrSummaryProps {
  period: OverviewPeriod;
  metrics: OverviewPeriodMetrics;
  compareLabel: string;
}

const formatAxis = (value: number) => formatCurrency(value, { compact: true });

/** 한 기간의 MRR: 큰 숫자, 증감률, 추이 차트 */
export function MrrSummary({ period, metrics, compareLabel }: MrrSummaryProps) {
  const data = metrics.mrrSeries.map((point) => ({
    label: formatSeriesLabel(point.at, PERIOD_UNIT[period]),
    mrr: point.value,
  }));

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Typography variant="display-md" render={<p />}>
          {formatCurrency(metrics.mrr.current)}
        </Typography>
        <ChangeBadge current={metrics.mrr.current} previous={metrics.mrr.previous} />
        <Typography variant="body-sm" className="text-muted">
          {compareLabel}
        </Typography>
      </div>
      <TrendLineChart
        title="MRR 추이"
        data={data}
        xKey="label"
        series={[{ dataKey: "mrr", name: "MRR" }]}
        formatValue={formatCurrency}
        formatAxisValue={formatAxis}
      />
    </div>
  );
}
