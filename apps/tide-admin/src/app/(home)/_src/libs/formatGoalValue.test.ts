import { formatGoalValue } from "./formatGoalValue";

describe("formatGoalValue", () => {
  it("단위대로 쓴다", () => {
    expect(formatGoalValue(48_230, "currency")).toBe("$48,230");
    expect(formatGoalValue(1_264, "count")).toBe("1,264");
    expect(formatGoalValue(0.482, "rate")).toBe("48.2%");
  });
});
