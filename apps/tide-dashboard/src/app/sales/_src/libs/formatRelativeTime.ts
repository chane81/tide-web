const formatter = new Intl.RelativeTimeFormat("ko-KR", { numeric: "auto" });

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/**
 * 기준 시각에서 얼마나 지났는지 쓴다(`4분 전`, `3시간 전`, `어제`).
 * 기준 시각을 인자로 받아 서버·클라이언트·테스트에서 같은 결과가 나온다.
 */
export function formatRelativeTime(iso: string, now: number): string {
  const diff = new Date(iso).getTime() - now;
  const abs = Math.abs(diff);

  if (abs < MINUTE) return "방금";
  if (abs < HOUR) return formatter.format(Math.round(diff / MINUTE), "minute");
  if (abs < DAY) return formatter.format(Math.round(diff / HOUR), "hour");

  return formatter.format(Math.round(diff / DAY), "day");
}
