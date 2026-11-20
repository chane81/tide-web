"use client";

import { Card, Tab, TabList, TabPanel, Tabs, Typography } from "@tide-design/components";

import { TrendLineChart } from "@/components/TrendLineChart";
import { formatCurrency } from "@/libs/formatCurrency";
import { formatSeriesLabel } from "@/libs/formatSeriesLabel";

import type { GetSalesReportResponse } from "../apis/sales.types";
import { SALES_PERIODS } from "../constants/salesPeriods";

export interface SalesReportProps {
  report: GetSalesReportResponse;
}

const formatAxis = (value: number) => formatCurrency(value, { compact: true });

/** 매출 보고서: 기간 탭 + 이번·지난 기간 2계열 라인 차트 */
export function SalesReport({ report }: SalesReportProps) {
  return (
    <Card
      render={<section aria-labelledby="sales-report-title" />}
      className="flex flex-col gap-4 p-6"
    >
      <Tabs defaultValue="12m" className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Typography variant="heading-sm" level={2} id="sales-report-title">
            매출 보고서
          </Typography>
          <TabList aria-label="보고서 기간">
            {SALES_PERIODS.map((period) => (
              <Tab key={period.value} value={period.value}>
                {period.label}
              </Tab>
            ))}
          </TabList>
        </div>
        {SALES_PERIODS.map((period) => (
          <TabPanel key={period.value} value={period.value}>
            <TrendLineChart
              title={`${period.label} 매출 보고서`}
              data={report[period.value].map((point) => ({
                label: formatSeriesLabel(point.at, period.unit),
                current: point.current,
                previous: point.previous,
              }))}
              xKey="label"
              series={[
                { dataKey: "current", name: "이번 기간" },
                { dataKey: "previous", name: period.previousLabel, color: "muted", dashed: true },
              ]}
              formatValue={formatCurrency}
              formatAxisValue={formatAxis}
              height={300}
            />
          </TabPanel>
        ))}
      </Tabs>
    </Card>
  );
}
