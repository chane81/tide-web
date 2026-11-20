/**
 * 누적 매출·누적 주문 수 시계열에서 시점마다의 평균 주문 금액을 구한다.
 * 두 배열은 같은 시각끼리 짝이다.
 * 누적 주문이 `minOrders`건에 이르기 전 시점은 뺀다. 주문 몇 건으로 낸 평균은 크게 튀어 추이를 가린다.
 */
export function getAverageOrderTrend(
  revenue: number[],
  orders: number[],
  minOrders = 10,
): number[] {
  return revenue.flatMap((value, index) => {
    const count = orders[index] ?? 0;
    return count < minOrders || count === 0 ? [] : [value / count];
  });
}
