import { formatCurrency } from "@/libs/formatCurrency";
import { formatNumber } from "@/libs/formatNumber";

import { getSalesKpis } from "../apis/sales/sales.api";
import { getAverageOrderTrend } from "../libs/getAverageOrderTrend";
import { getAverageOrderValue } from "../libs/getAverageOrderValue";
import { SalesKpiCard } from "./SalesKpiCard";

/** 오늘 매출·주문 수·평균 주문 금액 KPI 카드 세 장 */
export async function SalesKpis() {
  const { revenue, orders, hourly } = await getSalesKpis();
  const averageOrderValue = getAverageOrderValue(revenue, orders);
  // 하루 주문의 약 1/5이 쌓인 뒤부터 그린다. 그 전 평균은 몇 건에 끌려 크게 튄다.
  const averageOrderTrend = getAverageOrderTrend(
    hourly.revenue,
    hourly.orders,
    Math.ceil(orders.current / 5),
  );

  return (
    <ul aria-label="오늘 지표" className="grid gap-4 md:grid-cols-3">
      <SalesKpiCard
        label="오늘 매출"
        metric={revenue}
        format={formatCurrency}
        trend={hourly.revenue}
      />
      <SalesKpiCard label="주문 수" metric={orders} format={formatNumber} trend={hourly.orders} />
      <SalesKpiCard
        label="평균 주문 금액"
        metric={averageOrderValue}
        format={formatCurrency}
        trend={averageOrderTrend}
      />
    </ul>
  );
}
