/** 개요 화면 기간 탭 */
export type OverviewPeriod = "12m" | "30d" | "7d" | "24h";

/** 이번 값과 비교 기준(지난 기간) 값 */
export interface MetricValue {
  current: number;
  previous: number;
}

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
  /** 유료 회원 수 */
  paidMembers: MetricValue;
  /** 메일 열람률(0~1) */
  emailOpenRate: MetricValue;
}

/** `getOverviewMetrics` 응답: 기간별 지표를 한 번에 준다(탭 전환은 client에서). */
export type GetOverviewMetricsResponse = Record<OverviewPeriod, OverviewPeriodMetrics>;
