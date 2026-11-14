import type { MetricValue } from "@/types/metric";

/** 매출 ÷ 주문 수. 주문이 없으면 0이다. */
function divide(revenue: number, orders: number) {
  return orders === 0 ? 0 : revenue / orders;
}

/** 평균 주문 금액(이번·비교 값). 매출과 주문 수 KPI에서 계산한다. */
export function getAverageOrderValue(revenue: MetricValue, orders: MetricValue): MetricValue {
  return {
    current: divide(revenue.current, orders.current),
    previous: divide(revenue.previous, orders.previous),
  };
}
