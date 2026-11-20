import type { Transaction } from "../apis/cards.types";
import { sumByCategory } from "./sumByCategory";

function tx(overrides: Partial<Transaction>): Transaction {
  return {
    id: "tx",
    cardId: "card-1",
    merchant: "가맹점",
    category: "food",
    occurredAt: "2026-11-13T00:00:00.000Z",
    amount: 10,
    status: "completed",
    ...overrides,
  };
}

describe("sumByCategory", () => {
  it("카테고리별로 더하고 큰 순서로 준다", () => {
    const result = sumByCategory([
      tx({ category: "food", amount: 10 }),
      tx({ category: "travel", amount: 50 }),
      tx({ category: "food", amount: 40 }),
    ]);

    expect(result).toEqual([
      { category: "food", amount: 50, share: 0.5 },
      { category: "travel", amount: 50, share: 0.5 },
    ]);
  });

  it("대기는 넣고 취소는 뺀다", () => {
    const result = sumByCategory([
      tx({ category: "food", amount: 30, status: "pending" }),
      tx({ category: "shopping", amount: 70, status: "canceled" }),
    ]);

    expect(result).toEqual([{ category: "food", amount: 30, share: 1 }]);
  });

  it("거래가 없으면 빈 목록이다", () => {
    expect(sumByCategory([])).toEqual([]);
  });
});
