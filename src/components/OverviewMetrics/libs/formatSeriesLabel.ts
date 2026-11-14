import type { OverviewPeriod } from "@/apis/overview.types";

// 서버·브라우저 시간대 차이로 글자가 달라지지 않도록 UTC로 고정한다.
const formatters: Record<OverviewPeriod, Intl.DateTimeFormat> = {
  "12m": new Intl.DateTimeFormat("ko-KR", { timeZone: "UTC", month: "short" }),
  "30d": new Intl.DateTimeFormat("ko-KR", { timeZone: "UTC", month: "numeric", day: "numeric" }),
  "7d": new Intl.DateTimeFormat("ko-KR", { timeZone: "UTC", weekday: "short" }),
  "24h": new Intl.DateTimeFormat("ko-KR", { timeZone: "UTC", hour: "numeric", hour12: false }),
};

/** 차트 x축 글자. 기간에 맞는 단위로 쓴다(12개월 → `11월`, 30일 → `11. 14.`, 7일 → `토`, 24시간 → `14시`). */
export function formatSeriesLabel(iso: string, period: OverviewPeriod): string {
  return formatters[period].format(new Date(iso));
}
