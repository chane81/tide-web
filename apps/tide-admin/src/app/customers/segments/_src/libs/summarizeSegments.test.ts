import { customerFixture } from "../../../_src/libs/customerFixture";
import { classifySegment, summarizeSegments } from "./summarizeSegments";

describe("classifySegment", () => {
  it("활성 고객은 결제 금액, 주문 수 순서로 나눈다", () => {
    expect(classifySegment(customerFixture({ id: "a", totalSpent: 3000, orders: 1 }))).toBe("vip");
    expect(classifySegment(customerFixture({ id: "b", totalSpent: 2999, orders: 10 }))).toBe(
      "loyal",
    );
    expect(classifySegment(customerFixture({ id: "c", totalSpent: 2999, orders: 9 }))).toBe(
      "regular",
    );
  });

  it("휴면·이탈 고객은 금액이 커도 상태를 따른다", () => {
    expect(classifySegment(customerFixture({ id: "a", status: "dormant", totalSpent: 9000 }))).toBe(
      "dormant",
    );
    expect(classifySegment(customerFixture({ id: "b", status: "churned", totalSpent: 9000 }))).toBe(
      "churned",
    );
  });
});

describe("summarizeSegments", () => {
  it("세그먼트별 수·비율·합계·평균을 구한다", () => {
    const summary = summarizeSegments([
      customerFixture({ id: "a", totalSpent: 4000 }),
      customerFixture({ id: "b", totalSpent: 5000 }),
      customerFixture({ id: "c", totalSpent: 100 }),
      customerFixture({ id: "d", status: "churned", totalSpent: 100 }),
    ]);
    const vip = summary.find((segment) => segment.id === "vip");

    expect(vip).toMatchObject({ count: 2, share: 0.5, totalSpent: 9000, averageSpent: 4500 });
    expect(summary.reduce((sum, segment) => sum + segment.count, 0)).toBe(4);
  });

  it("고객이 없으면 모든 세그먼트가 0이다", () => {
    const summary = summarizeSegments([]);

    expect(summary).toHaveLength(5);
    expect(summary.every((s) => s.count === 0 && s.share === 0 && s.averageSpent === 0)).toBe(true);
  });
});
