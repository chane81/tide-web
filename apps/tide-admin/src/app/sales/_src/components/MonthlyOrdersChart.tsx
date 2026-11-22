"use client";

import {
  Bar,
  BarChart,
  type BarShapeProps,
  CartesianGrid,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { CHART_THEME } from "@/constants/chartTheme";
import { formatNumber } from "@/libs/formatNumber";
import { formatSeriesLabel } from "@/libs/formatSeriesLabel";

import type { GetMonthlyOrdersResponse } from "../apis/sales/sales.types";

export interface MonthlyOrdersChartProps {
  items: GetMonthlyOrdersResponse["items"];
}

/** 막대 위쪽만 둥글게 한다. */
const BAR_RADIUS: [number, number, number, number] = [4, 4, 0, 0];

/** 막대 하나를 그린다. 이번 달(`highlight`)만 진한 primary, 나머지는 옅은 primary다. */
function renderBar(props: BarShapeProps) {
  const highlight = (props.payload as { highlight?: boolean } | undefined)?.highlight;

  return (
    <Rectangle
      {...props}
      radius={BAR_RADIUS}
      fill={highlight ? CHART_THEME.barFill : CHART_THEME.barFillMuted}
    />
  );
}

/** 월별 주문 수 막대 차트. 지난 달은 옅게, 마지막(이번) 달만 진하게 칠한다. 색은 tide CSS 변수다. */
export function MonthlyOrdersChart({ items }: MonthlyOrdersChartProps) {
  const data = items.map((item, index) => ({
    label: formatSeriesLabel(item.month, "month"),
    orders: item.orders,
    // 항목은 오래된 달부터 오므로 마지막이 이번 달이다.
    highlight: index === items.length - 1,
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
        height={298}
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
        {/* Recharts 3.10에서 Cell은 deprecated라 shape로 막대마다 색을 고른다. */}
        <Bar
          dataKey="orders"
          name="주문 수"
          fill={CHART_THEME.barFill}
          radius={BAR_RADIUS}
          maxBarSize={20}
          shape={renderBar}
        />
      </BarChart>
    </figure>
  );
}
