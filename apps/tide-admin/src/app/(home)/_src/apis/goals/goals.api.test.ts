import { getGoals } from "./goals.api";

vi.mock("next/cache", () => ({ cacheLife: () => {} }));

describe("getGoals", () => {
  it("이번 달 목표를 items로 주고, 목표 값은 모두 0보다 크다", async () => {
    const { month, items } = await getGoals();

    expect(month).toBe("2026-11-01T00:00:00.000Z");
    expect(items.length).toBeGreaterThan(0);
    expect(items.every((goal) => goal.target > 0)).toBe(true);
  });
});
