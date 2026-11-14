/**
 * 차트에 넘기는 tide CSS 변수(ADR 0002). hex를 쓰지 않아 data-theme이 바뀌면 차트도 따라간다.
 * tide에 차트 전용 색 순서가 없어 계열 색은 Role·색 계열 토큰에서 고른다.
 */
export const CHART_THEME = {
  grid: "var(--tide-border-default)",
  axisText: "var(--tide-text-muted)",
  cursor: "var(--tide-border-strong)",
  tooltipBackground: "var(--tide-bg-raised)",
  tooltipBorder: "var(--tide-border-raised)",
  tooltipText: "var(--tide-text-default)",
  tooltipShadow: "var(--tide-shadow-md)",
  dotFill: "var(--tide-bg-surface)",
  barFill: "var(--tide-bg-primary-solid)",
  barCursor: "var(--tide-bg-hover)",
  fontFamily: "var(--tide-font-sans)",
  fontSize: 12,
} as const;

/** 계열 색. 첫 계열은 primary, 다음부터 색 계열에서 고른 임시 순서다. */
export const SERIES_COLORS = {
  primary: "var(--tide-border-primary)",
  muted: "var(--tide-text-muted)",
  purple: "var(--tide-purple-solid)",
  mint: "var(--tide-mint-solid)",
} as const;

export type SeriesColor = keyof typeof SERIES_COLORS;
