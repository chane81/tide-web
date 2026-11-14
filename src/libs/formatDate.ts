// 서버와 브라우저의 시간대가 달라도 같은 글자가 나오도록 UTC로 고정한다(hydration 불일치 방지).
const formatter = new Intl.DateTimeFormat("ko-KR", {
  timeZone: "UTC",
  year: "numeric",
  month: "long",
  day: "numeric",
});

/** ISO 시각을 날짜로 쓴다. 예: `2026년 11월 14일` */
export function formatDate(iso: string): string {
  return formatter.format(new Date(iso));
}
