import { Card, Tab, TabList, TabPanel } from "@tide-design/components";

import type { GetOverviewMetricsResponse } from "../../../apis/overview/overview.types";
import { OVERVIEW_PERIODS } from "../constants/periods";
import { MrrSummary } from "./MrrSummary";

export interface MrrCardProps {
  /** 기간별 지표 전체. 기간마다 패널 하나를 둔다. */
  metrics: GetOverviewMetricsResponse;
}

/**
 * 핵심 지표 MRR 카드. 머리 오른쪽에 기간 탭을 두고, 본문은 고른 기간의 패널이다.
 * 바깥 `Tabs` 안에 있어야 한다(탭 상태는 보조 지표와 함께 쓴다).
 */
export function MrrCard({ metrics }: MrrCardProps) {
  return (
    <Card
      render={<section aria-labelledby="mrr-title" />}
      className="flex flex-col gap-4 p-6 shadow-sm"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-label-md text-muted" id="mrr-title">
          MRR
        </span>
        <TabList aria-label="기간">
          {OVERVIEW_PERIODS.map((period) => (
            <Tab key={period.value} value={period.value}>
              {period.label}
            </Tab>
          ))}
        </TabList>
      </div>
      {OVERVIEW_PERIODS.map((period) => (
        <TabPanel key={period.value} value={period.value}>
          <MrrSummary
            period={period.value}
            metrics={metrics[period.value]}
            compareLabel={period.compareLabel}
          />
        </TabPanel>
      ))}
    </Card>
  );
}
