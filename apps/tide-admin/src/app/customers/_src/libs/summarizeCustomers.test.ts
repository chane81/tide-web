import { customerFixture } from "./customerFixture";
import { summarizeCustomers } from "./summarizeCustomers";

describe("summarizeCustomers", () => {
  it("상태별로 세고 결제 금액을 더한다", () => {
    const result = summarizeCustomers([
      customerFixture({ id: "a", status: "active", totalSpent: 100 }),
      customerFixture({ id: "b", status: "active", totalSpent: 300 }),
      customerFixture({ id: "c", status: "dormant", totalSpent: 50 }),
      customerFixture({ id: "d", status: "churned", totalSpent: 0 }),
    ]);

    expect(result).toEqual({
      total: 4,
      byStatus: { active: 2, dormant: 1, churned: 1 },
      totalSpent: 450,
      averageSpent: 112.5,
    });
  });

  it("고객이 없으면 모두 0이다", () => {
    expect(summarizeCustomers([])).toEqual({
      total: 0,
      byStatus: { active: 0, dormant: 0, churned: 0 },
      totalSpent: 0,
      averageSpent: 0,
    });
  });
});
