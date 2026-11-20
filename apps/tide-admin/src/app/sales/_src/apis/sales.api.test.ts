import { getMonthlyOrders, getRecentPurchases, getSalesKpis, getSalesReport } from "./sales.api";

vi.mock("next/cache", () => ({ cacheLife: () => {} }));

describe("sales apis", () => {
  it("KPI는 매출·주문 수의 이번·비교 값을 준다", async () => {
    const kpis = await getSalesKpis();

    expect(kpis.revenue).toEqual({ current: expect.any(Number), previous: expect.any(Number) });
    expect(kpis.orders).toEqual({ current: expect.any(Number), previous: expect.any(Number) });
  });

  it("보고서는 기간마다 점 개수가 맞고, 점마다 이번·지난 값이 있다", async () => {
    const report = await getSalesReport();

    expect(report["12m"]).toHaveLength(12);
    expect(report["30d"]).toHaveLength(30);
    expect(report["7d"]).toHaveLength(7);
    expect(report["7d"][0]).toEqual({
      at: expect.any(String),
      current: expect.any(Number),
      previous: expect.any(Number),
    });
  });

  it("월별 주문은 12개월이고 오래된 달부터 온다", async () => {
    const { items } = await getMonthlyOrders();

    expect(items).toHaveLength(12);
    expect(items.map((i) => i.month)).toEqual(items.map((i) => i.month).toSorted());
  });

  it("최근 구매는 최신순이다", async () => {
    const { items } = await getRecentPurchases();
    const times = items.map((p) => p.purchasedAt);

    expect(times).toEqual(times.toSorted().toReversed());
  });

  it("결정적이다: 모듈을 새로 불러도 같은 결과를 준다", async () => {
    const before = [await getSalesReport(), await getMonthlyOrders()];
    vi.resetModules();
    const fresh = await import("./sales.api");

    expect([await fresh.getSalesReport(), await fresh.getMonthlyOrders()]).toEqual(before);
  });
});
