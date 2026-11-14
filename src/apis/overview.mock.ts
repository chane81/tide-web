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

/** 시드 고정 난수(mulberry32). 같은 시드면 늘 같은 수열이다. */
function seededRandom(seed: number) {
  let t = seed;

  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;

    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

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

function periodMetrics(
  mrrSeries: SeriesPoint[],
  members: [number, number],
  paid: [number, number],
  openRate: [number, number],
): OverviewPeriodMetrics {
  return {
    mrr: { current: mrrSeries.at(-1)?.value ?? 0, previous: mrrSeries[0]?.value ?? 0 },
    mrrSeries,
    totalMembers: { current: members[0], previous: members[1] },
    paidMembers: { current: paid[0], previous: paid[1] },
    emailOpenRate: { current: openRate[0], previous: openRate[1] },
  };
}

const series: Record<OverviewPeriod, SeriesPoint[]> = {
  "12m": endAtCurrentMrr(buildMonthlySeries(12, 38_000, 0.025)),
  "30d": endAtCurrentMrr(buildSeries(30, 30, DAY, 47_100, 0.002)),
  "7d": endAtCurrentMrr(buildSeries(7, 7, DAY, 48_900, -0.002)),
  "24h": endAtCurrentMrr(buildSeries(24, 24, HOUR, 48_200, 0)),
};

export const overviewMetricsMock: GetOverviewMetricsResponse = {
  "12m": periodMetrics(series["12m"], [4_862, 3_190], [2_041, 1_288], [0.482, 0.441]),
  "30d": periodMetrics(series["30d"], [4_862, 4_598], [2_041, 1_962], [0.482, 0.495]),
  "7d": periodMetrics(series["7d"], [4_862, 4_801], [2_041, 2_041], [0.482, 0.47]),
  "24h": periodMetrics(series["24h"], [4_862, 4_855], [2_041, 2_046], [0.482, 0.482]),
};
