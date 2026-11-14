const full = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
});

const compact = new Intl.NumberFormat("ko-KR", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
  notation: "compact",
  maximumFractionDigits: 1,
});

/** 달러 금액. 기본은 `$48,230`, `compact`면 `$4.8만`(차트 축 등 좁은 자리). */
export function formatCurrency(value: number, options: { compact?: boolean } = {}): string {
  return (options.compact ? compact : full).format(value);
}
