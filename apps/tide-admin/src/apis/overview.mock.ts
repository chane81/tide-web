import { seededRandom } from "@/libs/seededRandom";

import type {
  GetOverviewMetricsResponse,
  OverviewPeriod,
  OverviewPeriodMetrics,
  SeriesPoint,
} from "./overview.types";

/** 목업 기준 시각. `Date.now()`를 쓰지 않아 서버·클라이언트·테스트 결과가 같다. */
const ANCHOR = Date.UTC(2026, 10, 14, 0, 0, 0);

/** 지금 MRR. 기간과 상관없이 같은 값이라, 모든 시계열의 마지막 점을 이 값에 맞춘다. */
const CURRENT_MRR = 48_230;

const HOUR = 60 * 60 * 1000;
const DAY = 24 * HOUR;

/** 시작값에서 조금씩 오르내리는 시계열(점 `count`개, 마지막 점이 ANCHOR) */
function buildSeries(
  seed: number,
  count: number,
  stepMs: number,
  start: number,
  drift: number,
): SeriesPoint[] {
  const random = seededRandom(seed);
  let value = start;

  return Array.from({ length: count }, (_, i) => {
    if (i > 0) value = Math.max(0, value * (1 + drift + (random() - 0.5) * 0.06));

    return {
      at: new Date(ANCHOR - (count - 1 - i) * stepMs).toISOString(),
      value: Math.round(value),
    };
  });
}

/** 12개월은 달 단위 점이다. 달 길이가 달라 UTC 달력으로 거슬러 간다. */
function buildMonthlySeries(seed: number, start: number, drift: number): SeriesPoint[] {
  const random = seededRandom(seed);
  const anchor = new Date(ANCHOR);
  let value = start;

  return Array.from({ length: 12 }, (_, i) => {
    if (i > 0) value = value * (1 + drift + (random() - 0.5) * 0.06);
    const at = new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth() - (11 - i), 1));

    return { at: at.toISOString(), value: Math.round(value) };
  });
}

/** 시계열 모양은 두고 마지막 점이 `CURRENT_MRR`이 되도록 비율을 맞춘다. */
function endAtCurrentMrr(points: SeriesPoint[]): SeriesPoint[] {
  const last = points.at(-1)?.value ?? 0;
  if (last === 0) return points;
  const scale = CURRENT_MRR / last;

  return points.map((p, i) => ({
    ...p,
    value: i === points.length - 1 ? CURRENT_MRR : Math.round(p.value * scale),
  }));
}

/**
 * MRR 시계열과 같은 시각에 놓이는 보조 지표 시계열.
 * 첫 점은 `previous`, 마지막 점은 `current`로 고정하고, 그 사이는 직선 위에 양 끝이 0인 흔들림을 얹는다.
 * 그래서 증감 배지와 스파크라인의 방향이 늘 같다. `digits`는 소수 자릿수(회원 수 0, 비율 3)다.
 */
function seriesBetween(
  base: SeriesPoint[],
  seed: number,
  [current, previous]: [number, number],
  digits: number,
  volatility: number,
): SeriesPoint[] {
  const random = seededRandom(seed);
  const last = base.length - 1;
  const factor = 10 ** digits;

  // 0에서 시작하는 랜덤 워크를 만들고, 끝점이 0이 되도록 기울기를 뺀다.
  let walk = 0;
  const walks = base.map((_, i) => (i === 0 ? 0 : (walk += random() - 0.5)));
  const end = walks[last] ?? 0;

  return base.map((point, i) => {
    if (i === 0) return { at: point.at, value: previous };
    if (i === last) return { at: point.at, value: current };
    const t = i / last;
    const noise = ((walks[i] ?? 0) - end * t) * current * volatility;

    return {
      at: point.at,
      value: Math.round((previous + (current - previous) * t + noise) * factor) / factor,
    };
  });
}

function periodMetrics(
  seed: number,
  mrrSeries: SeriesPoint[],
  members: [number, number],
  paid: [number, number],
  openRate: [number, number],
): OverviewPeriodMetrics {
  return {
    mrr: { current: mrrSeries.at(-1)?.value ?? 0, previous: mrrSeries[0]?.value ?? 0 },
    mrrSeries,
    totalMembers: { current: members[0], previous: members[1] },
    totalMembersSeries: seriesBetween(mrrSeries, seed + 1, members, 0, 0.01),
    paidMembers: { current: paid[0], previous: paid[1] },
    paidMembersSeries: seriesBetween(mrrSeries, seed + 2, paid, 0, 0.012),
    emailOpenRate: { current: openRate[0], previous: openRate[1] },
    emailOpenRateSeries: seriesBetween(mrrSeries, seed + 3, openRate, 3, 0.05),
  };
}

const series: Record<OverviewPeriod, SeriesPoint[]> = {
  "12m": endAtCurrentMrr(buildMonthlySeries(12, 38_000, 0.025)),
  "30d": endAtCurrentMrr(buildSeries(30, 30, DAY, 47_100, 0.002)),
  "7d": endAtCurrentMrr(buildSeries(7, 7, DAY, 48_900, -0.002)),
  "24h": endAtCurrentMrr(buildSeries(24, 24, HOUR, 48_200, 0)),
};

export const overviewMetricsMock: GetOverviewMetricsResponse = {
  "12m": periodMetrics(12, series["12m"], [4_862, 3_190], [2_041, 1_288], [0.482, 0.441]),
  "30d": periodMetrics(30, series["30d"], [4_862, 4_598], [2_041, 1_962], [0.482, 0.495]),
  "7d": periodMetrics(7, series["7d"], [4_862, 4_801], [2_041, 2_041], [0.482, 0.47]),
  "24h": periodMetrics(24, series["24h"], [4_862, 4_855], [2_041, 2_046], [0.482, 0.482]),
};
