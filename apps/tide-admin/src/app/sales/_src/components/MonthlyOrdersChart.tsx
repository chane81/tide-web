"use client";

import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

import { CHART_THEME } from "@/constants/chartTheme";
import { formatNumber } from "@/libs/formatNumber";
import { formatSeriesLabel } from "@/libs/formatSeriesLabel";

import type { GetMonthlyOrdersResponse } from "../apis/sales.types";

export interface MonthlyOrdersChartProps {
  items: GetMonthlyOrdersResponse["items"];
}

/** 월별 주문 수 막대 차트. 색은 tide CSS 변수다. */
export function MonthlyOrdersChart({ items }: MonthlyOrdersChartProps) {
  const data = items.map((item) => ({
    label: formatSeriesLabel(item.month, "month"),
    orders: item.orders,
  }));
  const tick = {
    fill: CHART_THEME.axisText,
    fontSize: CHART_THEME.fontSize,
    fontFamily: CHART_THEME.fontFamily,
  };

  return (
    <figure aria-label="월별 주문 수" className="m-0">
      <BarChart
        responsive
        width="100%"
        height={260}
        data={data}
        margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
      >
        <CartesianGrid stroke={CHART_THEME.grid} strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey="label"
          tick={tick}
          tickLine={false}
          axisLine={{ stroke: CHART_THEME.grid }}
        />
        <YAxis
          tick={tick}
          tickLine={false}
          axisLine={false}
          width={48}
          tickFormatter={(v: number) => formatNumber(v)}
        />
        <Tooltip
          cursor={{ fill: CHART_THEME.barCursor }}
          formatter={(value) => (typeof value === "number" ? formatNumber(value) : value)}
          contentStyle={{
            background: CHART_THEME.tooltipBackground,
            border: `1px solid ${CHART_THEME.tooltipBorder}`,
            borderRadius: 8,
            boxShadow: CHART_THEME.tooltipShadow,
            color: CHART_THEME.tooltipText,
            fontFamily: CHART_THEME.fontFamily,
            fontSize: CHART_THEME.fontSize,
          }}
          labelStyle={{ color: CHART_THEME.tooltipText }}
          itemStyle={{ color: CHART_THEME.tooltipText }}
        />
        <Bar
          dataKey="orders"
          name="주문 수"
          fill={CHART_THEME.barFill}
          radius={[4, 4, 0, 0]}
          maxBarSize={32}
        />
      </BarChart>
    </figure>
  );
}
