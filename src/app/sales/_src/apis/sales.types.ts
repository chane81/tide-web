import type { MetricValue } from "@/types/metric";

/** 매출 보고서 기간 탭 */
export type SalesPeriod = "12m" | "30d" | "7d";

/** `getSalesKpis` 응답: 오늘과 어제(비교 기준)의 매출·주문 수 */
export interface GetSalesKpisResponse {
  /** 매출(달러) */
  revenue: MetricValue;
  /** 주문 수 */
  orders: MetricValue;
}

/** 보고서 시계열의 점 하나: 이번 기간 값과 같은 위치의 지난 기간 값 */
export interface SalesReportPoint {
  /** 이번 기간의 시각(ISO 8601, UTC) */
  at: string;
  current: number;
  previous: number;
}

/** `getSalesReport` 응답: 기간별 보고서(탭 전환은 client에서) */
export type GetSalesReportResponse = Record<SalesPeriod, SalesReportPoint[]>;

/** `getMonthlyOrders` 응답 */
export interface GetMonthlyOrdersResponse {
  items: { month: string; orders: number }[];
}

/** 구매 활동 하나 */
export interface Purchase {
  id: string;
  customer: { name: string; avatarUrl?: string };
  product: { name: string; href: string };
  /** 금액(달러) */
  amount: number;
  /** 구매 시각(ISO 8601, UTC) */
  purchasedAt: string;
}

/** `getRecentPurchases` 응답 */
export interface GetRecentPurchasesResponse {
  items: Purchase[];
  /** 이 목록을 만든 시각(ISO 8601). 「n분 전」은 이 시각 기준으로 쓴다(렌더 시각과 무관하게 같은 글자). */
  asOf: string;
}
