"use client";

import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

import { CHART_THEME, SERIES_COLORS, type SeriesColor } from "@/constants/chartTheme";

/** 선 하나 */
export interface TrendLineSeries {
  /** 데이터 객체에서 읽을 키 */
  dataKey: string;
  /** 툴팁에 보일 이름 */
  name: string;
  color?: SeriesColor;
  /** 지난 기간처럼 비교용 선이면 점선으로 그린다. */
  dashed?: boolean;
}

/** 차트 점 하나: x축 글자와 계열 값들 */
export type TrendLinePoint = Record<string, string | number>;

export interface TrendLineChartProps {
  data: TrendLinePoint[];
  /** x축 글자로 쓸 키(이미 포맷된 문자열) */
  xKey: string;
  series: TrendLineSeries[];
  /** y축·툴팁 값 포맷 */
  formatValue: (value: number) => string;
  /** y축 눈금용 짧은 포맷. 없으면 `formatValue` */
  formatAxisValue?: (value: number) => string;
  /** 스크린 리더용 차트 이름 */
  title: string;
  height?: number;
}

/**
 * Recharts 라인 차트 래퍼. 색·격자·축·툴팁을 tide CSS 변수로 칠하고 부모 폭을 따라 늘어난다.
 * tide에 차트가 없어 만든 것이다(docs/tide-gaps.md).
 */
export function TrendLineChart({
  data,
  xKey,
  series,
  formatValue,
  formatAxisValue = formatValue,
  title,
  height = 260,
}: TrendLineChartProps) {
  const tick = {
    fill: CHART_THEME.axisText,
    fontSize: CHART_THEME.fontSize,
    fontFamily: CHART_THEME.fontFamily,
  };

  return (
    <figure aria-label={title} className="m-0">
      <LineChart
        responsive
        width="100%"
        height={height}
        data={data}
        margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
        title={title}
      >
        <CartesianGrid stroke={CHART_THEME.grid} strokeDasharray="3 3" vertical={false} />
        <XAxis
          dataKey={xKey}
          tick={tick}
          tickLine={false}
          axisLine={{ stroke: CHART_THEME.grid }}
          minTickGap={16}
        />
        <YAxis
          tick={tick}
          tickLine={false}
          axisLine={false}
          width={56}
          // 0부터가 아니라 데이터 범위로 잡아 추이가 보이게 한다.
          domain={["auto", "auto"]}
          tickFormatter={(value: number) => formatAxisValue(value)}
        />
        <Tooltip
          cursor={{ stroke: CHART_THEME.cursor }}
          formatter={(value) => (typeof value === "number" ? formatValue(value) : value)}
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
        {series.map((s) => (
          <Line
            key={s.dataKey}
            type="monotone"
            dataKey={s.dataKey}
            name={s.name}
            stroke={SERIES_COLORS[s.color ?? "primary"]}
            strokeWidth={2}
            strokeDasharray={s.dashed ? "4 4" : undefined}
            dot={false}
            activeDot={{
              r: 4,
              fill: CHART_THEME.dotFill,
              stroke: SERIES_COLORS[s.color ?? "primary"],
              strokeWidth: 2,
            }}
          />
        ))}
      </LineChart>
    </figure>
  );
}
