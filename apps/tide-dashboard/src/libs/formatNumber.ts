const formatter = new Intl.NumberFormat("ko-KR");

/** 개수 같은 정수를 천 단위 구분해 쓴다. 예: `4,862` */
export function formatNumber(value: number): string {
  return formatter.format(value);
}
