import type { OverviewPeriod } from "@/apis/overview.types";

/** 기간 탭 순서와 이름 */
export const OVERVIEW_PERIODS: { value: OverviewPeriod; label: string; compareLabel: string }[] = [
  { value: "12m", label: "12개월", compareLabel: "12개월 전 대비" },
  { value: "30d", label: "30일", compareLabel: "30일 전 대비" },
  { value: "7d", label: "7일", compareLabel: "7일 전 대비" },
  { value: "24h", label: "24시간", compareLabel: "24시간 전 대비" },
];
