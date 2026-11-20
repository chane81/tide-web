"use client";

import { useId } from "react";
import { Area, AreaChart, YAxis } from "recharts";

import { SERIES_COLORS, type SeriesColor } from "@/constants/chartTheme";

export interface SparklineProps {
  /** 시간 순서대로 놓인 값 */
  values: number[];
  /** 스크린 리더용 이름(「최근 12개월 전체 회원 추이」 등) */
  title: string;
  color?: SeriesColor;
  height?: number;
}

/**
 * 축·격자·툴팁 없는 작은 추이 선. 지표 카드 안에서 값의 흐름만 보여 준다.
 * 색은 tide CSS 변수(ADR 0002)이고 부모 폭을 따라 늘어난다. tide에 차트가 없어 만든 것이다(docs/tide-gaps.md).
 */
export function Sparkline({ values, title, color = "primary", height = 40 }: SparklineProps) {
  // 한 화면에 여럿이어도 그라디언트 id가 겹치지 않게 한다. 특수 문자는 url(#id) 참조를 깨뜨려 걸러 낸다.
  const gradientId = `spark${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const stroke = SERIES_COLORS[color];
  const data = values.map((value, index) => ({ index, value }));

  return (
    <figure aria-label={title} className="m-0">
      <AreaChart
        responsive
        width="100%"
        height={height}
        data={data}
        margin={{ top: 2, right: 0, bottom: 2, left: 0 }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" style={{ stopColor: stroke, stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: stroke, stopOpacity: 0 }} />
          </linearGradient>
        </defs>
        {/* 0부터가 아니라 데이터 범위로 잡아 작은 높이에서도 오르내림이 보이게 한다. */}
        <YAxis hide domain={["dataMin", "dataMax"]} />
        <Area
          type="monotone"
          dataKey="value"
          stroke={stroke}
          strokeWidth={1.5}
          fill={`url(#${gradientId})`}
          dot={false}
          activeDot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </figure>
  );
}
