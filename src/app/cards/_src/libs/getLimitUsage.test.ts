import { getLimitUsage } from "./getLimitUsage";

describe("getLimitUsage", () => {
  it("80% 미만은 primary", () => {
    expect(getLimitUsage(1_000, 5_000)).toEqual({ rate: 0.2, color: "primary" });
  });

  it("80% 이상은 warning", () => {
    expect(getLimitUsage(800, 1_000)).toEqual({ rate: 0.8, color: "warning" });
  });

  it("한도 이상은 danger", () => {
    expect(getLimitUsage(1_200, 1_000)).toEqual({ rate: 1.2, color: "danger" });
  });

  it("한도가 0이면 사용률 0", () => {
    expect(getLimitUsage(100, 0)).toEqual({ rate: 0, color: "primary" });
  });
});
