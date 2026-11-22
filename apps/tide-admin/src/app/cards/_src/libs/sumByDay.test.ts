import type { Transaction } from "../apis/cards/cards.types";
import { sumByDay } from "./sumByDay";

function tx(overrides: Partial<Transaction>): Transaction {
  return {
    id: "tx",
    cardId: "card-1",
    merchant: "가맹점",
    category: "food",
    occurredAt: "2026-11-03T09:00:00.000Z",
    amount: 10,
    status: "completed",
    ...overrides,
  };
}

describe("sumByDay", () => {
  it("최근 거래가 있는 달의 1일부터 그날까지 일별로 더하고 빈 날은 0으로 채운다", () => {
    const result = sumByDay([
      tx({ occurredAt: "2026-11-03T22:00:00.000Z", amount: 30 }),
      tx({ occurredAt: "2026-11-03T01:00:00.000Z", amount: 20 }),
      tx({ occurredAt: "2026-11-01T12:00:00.000Z", amount: 5 }),
    ]);

    expect(result).toEqual([
      { date: "2026-11-01", amount: 5 },
      { date: "2026-11-02", amount: 0 },
      { date: "2026-11-03", amount: 50 },
    ]);
  });

  it("지난달 거래는 넣지 않는다", () => {
    const result = sumByDay([
      tx({ occurredAt: "2026-11-02T00:00:00.000Z", amount: 10 }),
      tx({ occurredAt: "2026-10-31T23:00:00.000Z", amount: 99 }),
    ]);

    expect(result).toEqual([
      { date: "2026-11-01", amount: 0 },
      { date: "2026-11-02", amount: 10 },
    ]);
  });

  it("대기는 넣고 취소는 뺀다", () => {
    const result = sumByDay([
      tx({ occurredAt: "2026-11-01T00:00:00.000Z", amount: 15, status: "pending" }),
      tx({ occurredAt: "2026-11-01T05:00:00.000Z", amount: 70, status: "canceled" }),
    ]);

    expect(result).toEqual([{ date: "2026-11-01", amount: 15 }]);
  });

  it("셈할 거래가 없으면 빈 목록이다", () => {
    expect(sumByDay([])).toEqual([]);
    expect(sumByDay([tx({ status: "canceled" })])).toEqual([]);
  });
});
