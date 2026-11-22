import { getTopMembers } from "../members/members.api";
import { getOverviewMetrics } from "./overview.api";

vi.mock("next/cache", () => ({ cacheLife: () => {} }));

describe("getOverviewMetrics", () => {
  it("기간 네 개의 지표를 모두 돌려준다", async () => {
    const metrics = await getOverviewMetrics();

    expect(Object.keys(metrics).toSorted()).toEqual(["12m", "24h", "30d", "7d"]);
    expect(metrics["12m"].mrrSeries).toHaveLength(12);
    expect(metrics["30d"].mrrSeries).toHaveLength(30);
    expect(metrics["7d"].mrrSeries).toHaveLength(7);
    expect(metrics["24h"].mrrSeries).toHaveLength(24);
  });

  it("MRR 이번 값은 시계열의 마지막 점, 비교 값은 첫 점이다", async () => {
    const { "30d": month } = await getOverviewMetrics();

    expect(month.mrr.current).toBe(month.mrrSeries.at(-1)?.value);
    expect(month.mrr.previous).toBe(month.mrrSeries[0]?.value);
  });

  it("지금 MRR은 기간과 상관없이 같다", async () => {
    const metrics = await getOverviewMetrics();
    const currents = Object.values(metrics).map((m) => m.mrr.current);

    expect(new Set(currents).size).toBe(1);
  });

  it("보조 지표 시계열은 MRR과 같은 시각에 놓이고, 첫 점이 비교 값·마지막 점이 이번 값이다", async () => {
    const metrics = await getOverviewMetrics();

    for (const m of Object.values(metrics)) {
      const times = m.mrrSeries.map((p) => p.at);

      for (const [metric, points] of [
        [m.totalMembers, m.totalMembersSeries],
        [m.paidMembers, m.paidMembersSeries],
        [m.emailOpenRate, m.emailOpenRateSeries],
      ] as const) {
        expect(points.map((p) => p.at)).toEqual(times);
        expect(points[0]?.value).toBe(metric.previous);
        expect(points.at(-1)?.value).toBe(metric.current);
      }
    }
  });

  it("메일 열람률 시계열은 0~1 비율이고 회원 수 시계열은 정수다", async () => {
    const { "12m": year } = await getOverviewMetrics();

    for (const p of year.emailOpenRateSeries) {
      expect(p.value).toBeGreaterThan(0);
      expect(p.value).toBeLessThan(1);
    }
    expect(year.totalMembersSeries.every((p) => Number.isInteger(p.value))).toBe(true);
  });

  it("결정적이다: 모듈을 새로 불러도 같은 결과를 준다", async () => {
    const first = await getOverviewMetrics();
    vi.resetModules();
    const { getOverviewMetrics: fresh } = await import("./overview.api");

    expect(await fresh()).toEqual(first);
  });
});

describe("getTopMembers", () => {
  it("회원 목록을 items로 준다", async () => {
    const { items } = await getTopMembers();

    expect(items.length).toBeGreaterThan(0);
    expect(items[0]).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
      joinedAt: expect.any(String),
    });
  });
});
