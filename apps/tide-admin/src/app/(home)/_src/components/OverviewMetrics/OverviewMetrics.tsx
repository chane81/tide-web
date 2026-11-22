"use client";

import { Tabs } from "@tide-design/components";
import { useState } from "react";

import { formatNumber } from "@/libs/formatNumber";
import { formatPercent } from "@/libs/formatPercent";

import type { GetOverviewMetricsResponse, OverviewPeriod } from "../../apis/overview.types";
import { MrrCard } from "./components/MrrCard";
import { SecondaryMetricCard } from "./components/SecondaryMetricCard";
import { OVERVIEW_PERIODS } from "./constants/periods";

export interface OverviewMetricsProps {
  /** 기간별 지표 전체. 탭 전환은 받은 데이터 안에서 한다. */
  metrics: GetOverviewMetricsResponse;
}

const formatRate = (value: number) => formatPercent(value);

/**
 * MRR 카드(머리에 기간 탭) + 보조 지표.
 * 탭은 MRR 카드 안에 있지만 고른 기간은 보조 지표에도 쓰므로 `Tabs`가 둘을 함께 감싼다.
 */
export function OverviewMetrics({ metrics }: OverviewMetricsProps) {
  const [period, setPeriod] = useState<OverviewPeriod>("12m");
  const current = OVERVIEW_PERIODS.find((item) => item.value === period) ?? OVERVIEW_PERIODS[0];
  const m = metrics[current.value];

  return (
    <Tabs
      value={period}
      onValueChange={(value) => setPeriod(value as OverviewPeriod)}
      shape="box"
      className="grid gap-4 xl:grid-cols-[2fr_1fr]"
    >
      <MrrCard metrics={metrics} />
      <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
        <SecondaryMetricCard
          label="전체 회원"
          metric={m.totalMembers}
          series={m.totalMembersSeries}
          color="primary"
          format={formatNumber}
          compareLabel={current.compareLabel}
          periodLabel={current.label}
        />
        <SecondaryMetricCard
          label="유료 회원"
          metric={m.paidMembers}
          series={m.paidMembersSeries}
          color="purple"
          format={formatNumber}
          compareLabel={current.compareLabel}
          periodLabel={current.label}
        />
        <SecondaryMetricCard
          label="메일 열람률"
          metric={m.emailOpenRate}
          series={m.emailOpenRateSeries}
          color="mint"
          format={formatRate}
          compareLabel={current.compareLabel}
          periodLabel={current.label}
        />
      </div>
    </Tabs>
  );
}
