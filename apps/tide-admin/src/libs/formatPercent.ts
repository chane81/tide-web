const plain = new Intl.NumberFormat("ko-KR", { style: "percent", maximumFractionDigits: 1 });
const signed = new Intl.NumberFormat("ko-KR", {
  style: "percent",
  maximumFractionDigits: 1,
  signDisplay: "exceptZero",
});

/** 0~1 비율을 퍼센트로 쓴다. `signed`면 증감률처럼 부호를 붙인다(`+12.3%`, `-5%`, `0%`). */
export function formatPercent(rate: number, options: { signed?: boolean } = {}): string {
  return (options.signed ? signed : plain).format(rate);
}
