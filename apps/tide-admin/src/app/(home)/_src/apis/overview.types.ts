import type { MetricValue } from "@/types/metric";

/** 개요 화면 기간 탭 */
export type OverviewPeriod = "12m" | "30d" | "7d" | "24h";

/** 시계열의 점 하나. `at`은 ISO 8601(UTC)이다. */
export interface SeriesPoint {
  at: string;
  value: number;
}

/** 기간 하나의 지표 묶음 */
export interface OverviewPeriodMetrics {
  /** MRR(달러) */
  mrr: MetricValue;
  /** 기간 안의 MRR 추이 */
  mrrSeries: SeriesPoint[];
  /** 전체 회원 수 */
  totalMembers: MetricValue;
  /** 기간 안의 전체 회원 수 추이. 첫 점이 `previous`, 마지막 점이 `current`다. */
  totalMembersSeries: SeriesPoint[];
  /** 유료 회원 수 */
  paidMembers: MetricValue;
  /** 기간 안의 유료 회원 수 추이. 첫 점이 `previous`, 마지막 점이 `current`다. */
  paidMembersSeries: SeriesPoint[];
  /** 메일 열람률(0~1) */
  emailOpenRate: MetricValue;
  /** 기간 안의 메일 열람률 추이(0~1). 첫 점이 `previous`, 마지막 점이 `current`다. */
  emailOpenRateSeries: SeriesPoint[];
}

/** `getOverviewMetrics` 응답: 기간별 지표를 한 번에 준다(탭 전환은 client에서). */
export type GetOverviewMetricsResponse = Record<OverviewPeriod, OverviewPeriodMetrics>;
