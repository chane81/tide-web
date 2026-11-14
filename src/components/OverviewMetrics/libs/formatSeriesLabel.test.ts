import { formatSeriesLabel } from "./formatSeriesLabel";

describe("formatSeriesLabel", () => {
  it("기간마다 알맞은 단위로 쓴다", () => {
    expect(formatSeriesLabel("2026-11-01T00:00:00.000Z", "12m")).toBe("11월");
    expect(formatSeriesLabel("2026-11-14T00:00:00.000Z", "30d")).toBe("11. 14.");
    expect(formatSeriesLabel("2026-11-14T00:00:00.000Z", "7d")).toBe("토");
    expect(formatSeriesLabel("2026-11-13T14:00:00.000Z", "24h")).toBe("14시");
  });
});
