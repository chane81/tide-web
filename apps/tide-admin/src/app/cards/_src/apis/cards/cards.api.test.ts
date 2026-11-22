import { getCards, getTransactions } from "./cards.api";

vi.mock("next/cache", () => ({ cacheLife: () => {} }));

describe("cards apis", () => {
  it("카드마다 거래가 있고, 사용액은 취소를 뺀 거래 합계다", async () => {
    const { items: cards } = await getCards();
    const { items: transactions } = await getTransactions();

    expect(cards.length).toBeGreaterThan(1);
    for (const card of cards) {
      const own = transactions.filter((tx) => tx.cardId === card.id);
      const sum = own.filter((tx) => tx.status !== "canceled").reduce((s, tx) => s + tx.amount, 0);

      expect(own.length).toBeGreaterThan(0);
      expect(card.balance).toBe(sum);
    }
  });

  it("거래는 최신순이다", async () => {
    const times = (await getTransactions()).items.map((tx) => tx.occurredAt);

    expect(times).toEqual(times.toSorted().toReversed());
  });

  it("결정적이다: 모듈을 새로 불러도 같은 결과를 준다", async () => {
    const before = await getTransactions();
    vi.resetModules();
    const fresh = await import("./cards.api");

    expect(await fresh.getTransactions()).toEqual(before);
  });
});
