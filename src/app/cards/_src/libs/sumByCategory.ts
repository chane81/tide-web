import type { SpendingCategory, Transaction } from "../apis/cards.types";

export interface CategorySpending {
  category: SpendingCategory;
  /** 합계(달러) */
  amount: number;
  /** 전체 지출에서 차지하는 비율(0~1) */
  share: number;
}

/** 카테고리별 지출 합계, 큰 순서. 취소된 거래는 뺀다. */
export function sumByCategory(transactions: readonly Transaction[]): CategorySpending[] {
  const sums = new Map<SpendingCategory, number>();

  for (const tx of transactions) {
    if (tx.status === "canceled") continue;
    sums.set(tx.category, (sums.get(tx.category) ?? 0) + tx.amount);
  }

  const total = [...sums.values()].reduce((sum, amount) => sum + amount, 0);

  return [...sums]
    .map(([category, amount]) => ({ category, amount, share: total === 0 ? 0 : amount / total }))
    .toSorted((a, b) => b.amount - a.amount);
}
