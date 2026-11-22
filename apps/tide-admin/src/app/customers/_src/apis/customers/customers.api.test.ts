import { getCustomers } from "./customers.api";

vi.mock("next/cache", () => ({ cacheLife: () => {} }));

describe("getCustomers", () => {
  it("세 상태가 모두 있고 id가 겹치지 않는다", async () => {
    const { items } = await getCustomers();

    expect(new Set(items.map((c) => c.status))).toEqual(new Set(["active", "dormant", "churned"]));
    expect(new Set(items.map((c) => c.id)).size).toBe(items.length);
  });

  it("가입 최신순이고, 마지막 접속은 가입 뒤다", async () => {
    const { items } = await getCustomers();
    const joined = items.map((c) => c.joinedAt);

    expect(joined).toEqual(joined.toSorted().toReversed());
    for (const c of items) expect(c.lastSeenAt >= c.joinedAt).toBe(true);
  });

  it("결정적이다: 모듈을 새로 불러도 같은 결과를 준다", async () => {
    const before = await getCustomers();
    vi.resetModules();
    const fresh = await import("./customers.api");

    expect(await fresh.getCustomers()).toEqual(before);
  });
});
