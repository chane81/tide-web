import type { SeriesUnit } from "@/libs/formatSeriesLabel";

import type { SalesPeriod } from "../apis/sales/sales.types";

/** 매출 보고서 기간 탭 순서·이름·x축 단위 */
export const SALES_PERIODS: {
  value: SalesPeriod;
  label: string;
  previousLabel: string;
  unit: SeriesUnit;
}[] = [
  { value: "12m", label: "12개월", previousLabel: "지난 12개월", unit: "month" },
  { value: "30d", label: "30일", previousLabel: "지난 30일", unit: "day" },
  { value: "7d", label: "7일", previousLabel: "지난 7일", unit: "weekday" },
];
