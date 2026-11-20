import { formatCurrency } from "./formatCurrency";
import { formatDate } from "./formatDate";
import { formatNumber } from "./formatNumber";
import { formatPercent } from "./formatPercent";

describe("formatCurrency", () => {
  it("달러를 천 단위 구분해 소수 없이 쓴다", () => {
    expect(formatCurrency(48230)).toBe("$48,230");
    expect(formatCurrency(48230.7)).toBe("$48,231");
  });

  it("compact면 짧게 쓴다", () => {
    expect(formatCurrency(48230, { compact: true })).toBe("$4.8만");
  });
});

describe("formatPercent", () => {
  it("비율을 소수 한 자리 퍼센트로 쓴다", () => {
    expect(formatPercent(0.482)).toBe("48.2%");
  });

  it("signed면 증가에 +, 감소에 -를 붙이고 0에는 붙이지 않는다", () => {
    expect(formatPercent(0.1234, { signed: true })).toBe("+12.3%");
    expect(formatPercent(-0.05, { signed: true })).toBe("-5%");
    expect(formatPercent(0, { signed: true })).toBe("0%");
  });
});

describe("formatNumber", () => {
  it("천 단위로 구분한다", () => {
    expect(formatNumber(4862)).toBe("4,862");
  });
});

describe("formatDate", () => {
  it("UTC 기준 날짜로 쓴다(시간대에 따라 하루가 밀리지 않는다)", () => {
    expect(formatDate("2026-11-14T00:00:00.000Z")).toBe("2026년 11월 14일");
    expect(formatDate("2026-11-14T23:30:00.000Z")).toBe("2026년 11월 14일");
  });
});
