import { formatCardExpiry } from "./formatCardExpiry";

describe("formatCardExpiry", () => {
  it("MM/YY로 쓴다", () => {
    expect(formatCardExpiry(8, 2029)).toBe("08/29");
    expect(formatCardExpiry(11, 2030)).toBe("11/30");
  });

  it("연도 끝 두 자리가 한 자리 수면 앞에 0을 붙인다", () => {
    expect(formatCardExpiry(1, 2105)).toBe("01/05");
  });
});
