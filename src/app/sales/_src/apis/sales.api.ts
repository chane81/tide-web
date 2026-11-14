import { cacheLife } from "next/cache";

import {
  monthlyOrdersMock,
  purchasesAsOf,
  recentPurchasesMock,
  salesKpisMock,
  salesReportMock,
} from "./sales.mock";
import type {
  GetMonthlyOrdersResponse,
  GetRecentPurchasesResponse,
  GetSalesKpisResponse,
  GetSalesReportResponse,
} from "./sales.types";

/** 오늘 매출·주문 수(어제 대비). 목업이다. */
export async function getSalesKpis(): Promise<GetSalesKpisResponse> {
  "use cache";
  cacheLife("hours");

  return salesKpisMock;
}

/** 기간별 매출 보고서(이번·지난 기간). 탭 전환은 client에서 한다. */
export async function getSalesReport(): Promise<GetSalesReportResponse> {
  "use cache";
  cacheLife("hours");

  return salesReportMock;
}

/** 최근 12개월 월별 주문 수 */
export async function getMonthlyOrders(): Promise<GetMonthlyOrdersResponse> {
  "use cache";
  cacheLife("hours");

  return monthlyOrdersMock;
}

/** 최근 구매 활동 */
export async function getRecentPurchases(): Promise<GetRecentPurchasesResponse> {
  "use cache";
  cacheLife("minutes");

  return { items: recentPurchasesMock, asOf: purchasesAsOf };
}
