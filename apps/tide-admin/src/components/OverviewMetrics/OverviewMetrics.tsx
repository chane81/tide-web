"use client";

import { Tab, TabList, TabPanel, Tabs } from "@tide-design/components";

import type { GetOverviewMetricsResponse } from "@/apis/overview.types";
import { formatNumber } from "@/libs/formatNumber";
import { formatPercent } from "@/libs/formatPercent";

import { MrrCard } from "./components/MrrCard";
import { SecondaryMetricCard } from "./components/SecondaryMetricCard";
import { OVERVIEW_PERIODS } from "./constants/periods";

export interface OverviewMetricsProps {
  /** 기간별 지표 전체. 탭 전환은 받은 데이터 안에서 한다. */
  metrics: GetOverviewMetricsResponse;
}

const formatRate = (value: number) => formatPercent(value);

/** 기간 탭 + MRR 카드 + 보조 지표 */
export function OverviewMetrics({ metrics }: OverviewMetricsProps) {
  return (
    <Tabs defaultValue="12m" className="flex flex-col gap-4">
      <TabList aria-label="기간" className="self-start">
        {OVERVIEW_PERIODS.map((period) => (
          <Tab key={period.value} value={period.value}>
            {period.label}
          </Tab>
        ))}
      </TabList>
      {OVERVIEW_PERIODS.map((period) => {
        const m = metrics[period.value];

        return (
          <TabPanel
            key={period.value}
            value={period.value}
            className="grid gap-4 xl:grid-cols-[2fr_1fr]"
          >
            <MrrCard period={period.value} metrics={m} compareLabel={period.compareLabel} />
            <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
              <SecondaryMetricCard
                label="전체 회원"
                metric={m.totalMembers}
                series={m.totalMembersSeries}
                color="primary"
                format={formatNumber}
                compareLabel={period.compareLabel}
                periodLabel={period.label}
              />
              <SecondaryMetricCard
                label="유료 회원"
                metric={m.paidMembers}
                series={m.paidMembersSeries}
                color="purple"
                format={formatNumber}
                compareLabel={period.compareLabel}
                periodLabel={period.label}
              />
              <SecondaryMetricCard
                label="메일 열람률"
                metric={m.emailOpenRate}
                series={m.emailOpenRateSeries}
                color="mint"
                format={formatRate}
                compareLabel={period.compareLabel}
                periodLabel={period.label}
              />
            </div>
          </TabPanel>
        );
      })}
    </Tabs>
  );
}
