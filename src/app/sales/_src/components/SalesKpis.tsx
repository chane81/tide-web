import { formatCurrency } from "@/libs/formatCurrency";
import { formatNumber } from "@/libs/formatNumber";

import { getSalesKpis } from "../apis/sales.api";
import { getAverageOrderValue } from "../libs/getAverageOrderValue";
import { SalesKpiCard } from "./SalesKpiCard";

/** 오늘 매출·주문 수·평균 주문 금액 KPI 카드 세 장 */
export async function SalesKpis() {
  const { revenue, orders } = await getSalesKpis();
  const averageOrderValue = getAverageOrderValue(revenue, orders);

  return (
    <ul aria-label="오늘 지표" className="grid gap-4 md:grid-cols-3">
      <SalesKpiCard label="오늘 매출" metric={revenue} format={formatCurrency} />
      <SalesKpiCard label="주문 수" metric={orders} format={formatNumber} />
      <SalesKpiCard label="평균 주문 금액" metric={averageOrderValue} format={formatCurrency} />
    </ul>
  );
}
