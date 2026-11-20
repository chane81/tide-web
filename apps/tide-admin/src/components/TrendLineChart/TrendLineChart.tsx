"use client";

import { useId } from "react";
import { Area, AreaChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from "recharts";

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

/** 범례 글자. 계열색 대신 tide 본문 보조색으로 쓴다. */
function renderLegendText(value: string) {
  return <span style={{ color: CHART_THEME.axisText }}>{value}</span>;
}

/**
 * Recharts 추이 차트 래퍼. 실선 계열은 아래를 같은 색으로 옅게 채우고, 점선(비교) 계열은 선만 그린다.
 * 색·격자·축·툴팁을 tide CSS 변수로 칠하고 부모 폭을 따라 늘어난다.
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
  // 한 화면에 차트가 여럿이어도 그라디언트 id가 겹치지 않게 한다.
  // useId 값의 특수 문자는 url(#id) 참조를 깨뜨릴 수 있어 걸러 낸다.
  const gradientPrefix = `trend${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const tick = {
    fill: CHART_THEME.axisText,
    fontSize: CHART_THEME.fontSize,
    fontFamily: CHART_THEME.fontFamily,
  };

  return (
    <figure aria-label={title} className="m-0">
      <AreaChart
        responsive
        width="100%"
        height={height}
        data={data}
        margin={{ top: 8, right: 8, bottom: 0, left: 0 }}
        title={title}
      >
        <defs>
          {series.map((s) => (
            <linearGradient
              key={s.dataKey}
              id={`${gradientPrefix}-${s.dataKey}`}
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                style={{ stopColor: SERIES_COLORS[s.color ?? "primary"], stopOpacity: 0.24 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: SERIES_COLORS[s.color ?? "primary"], stopOpacity: 0 }}
              />
            </linearGradient>
          ))}
        </defs>
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
        {series.length > 1 && (
          // 계열이 둘 이상이면 어느 선이 무엇인지 범례로 알린다.
          <Legend
            verticalAlign="top"
            align="right"
            height={32}
            iconType="plainline"
            wrapperStyle={{ fontFamily: CHART_THEME.fontFamily, fontSize: CHART_THEME.fontSize }}
            formatter={renderLegendText}
          />
        )}
        {series.map((s) => (
          <Area
            key={s.dataKey}
            type="monotone"
            dataKey={s.dataKey}
            name={s.name}
            stroke={SERIES_COLORS[s.color ?? "primary"]}
            strokeWidth={2}
            strokeDasharray={s.dashed ? "4 4" : undefined}
            fill={s.dashed ? "none" : `url(#${gradientPrefix}-${s.dataKey})`}
            dot={false}
            activeDot={{
              r: 4,
              fill: CHART_THEME.dotFill,
              stroke: SERIES_COLORS[s.color ?? "primary"],
              strokeWidth: 2,
            }}
          />
        ))}
      </AreaChart>
    </figure>
  );
}
