import { getAverageOrderTrend } from "./getAverageOrderTrend";

describe("getAverageOrderTrend", () => {
  it("같은 시점의 누적 매출을 누적 주문 수로 나눈다", () => {
    expect(getAverageOrderTrend([100, 300, 600], [1, 4, 6], 1)).toEqual([100, 75, 100]);
  });

  it("누적 주문이 minOrders에 못 미치는 앞쪽 시점은 뺀다", () => {
    expect(getAverageOrderTrend([50, 400, 1_200], [2, 10, 20])).toEqual([40, 60]);
  });

  it("주문이 0이거나 짝이 없는 시점은 minOrders가 0이어도 뺀다", () => {
    expect(getAverageOrderTrend([0, 50, 80], [0, 2], 0)).toEqual([25]);
  });
});
