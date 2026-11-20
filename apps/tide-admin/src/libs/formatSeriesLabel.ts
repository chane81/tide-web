/** 시계열 점 간격 */
export type SeriesUnit = "month" | "day" | "weekday" | "hour";

// 서버·브라우저 시간대 차이로 글자가 달라지지 않도록 UTC로 고정한다.
const formatters: Record<SeriesUnit, Intl.DateTimeFormat> = {
  month: new Intl.DateTimeFormat("ko-KR", { timeZone: "UTC", month: "short" }),
  day: new Intl.DateTimeFormat("ko-KR", { timeZone: "UTC", month: "numeric", day: "numeric" }),
  weekday: new Intl.DateTimeFormat("ko-KR", { timeZone: "UTC", weekday: "short" }),
  hour: new Intl.DateTimeFormat("ko-KR", { timeZone: "UTC", hour: "numeric", hour12: false }),
};

/** 차트 x축 글자. 점 간격에 맞는 단위로 쓴다(month → `11월`, day → `11. 14.`, weekday → `토`, hour → `14시`). */
export function formatSeriesLabel(iso: string, unit: SeriesUnit): string {
  return formatters[unit].format(new Date(iso));
}
