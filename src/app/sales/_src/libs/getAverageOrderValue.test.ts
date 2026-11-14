import { getAverageOrderValue } from "./getAverageOrderValue";

describe("getAverageOrderValue", () => {
  it("이번·비교 값 각각 매출을 주문 수로 나눈다", () => {
    expect(
      getAverageOrderValue({ current: 1000, previous: 900 }, { current: 10, previous: 12 }),
    ).toEqual({
      current: 100,
      previous: 75,
    });
  });

  it("주문이 0이면 0이다(0으로 나누지 않는다)", () => {
    expect(
      getAverageOrderValue({ current: 500, previous: 0 }, { current: 0, previous: 0 }),
    ).toEqual({
      current: 0,
      previous: 0,
    });
  });
});
