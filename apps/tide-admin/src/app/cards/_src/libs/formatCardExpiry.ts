/** 카드 만료일을 카드에 찍힌 모양으로 쓴다. 예: `08/29` */
export function formatCardExpiry(month: number, year: number): string {
  return `${String(month).padStart(2, "0")}/${String(year % 100).padStart(2, "0")}`;
}
