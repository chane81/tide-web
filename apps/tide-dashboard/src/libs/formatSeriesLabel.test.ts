import { formatSeriesLabel } from "./formatSeriesLabel";

describe("formatSeriesLabel", () => {
  it("점 간격마다 알맞은 단위로 쓴다", () => {
    expect(formatSeriesLabel("2026-11-01T00:00:00.000Z", "month")).toBe("11월");
    expect(formatSeriesLabel("2026-11-14T00:00:00.000Z", "day")).toBe("11. 14.");
    expect(formatSeriesLabel("2026-11-14T00:00:00.000Z", "weekday")).toBe("토");
    expect(formatSeriesLabel("2026-11-13T14:00:00.000Z", "hour")).toBe("14시");
  });

  it("UTC 기준이라 시간대에 따라 날짜가 밀리지 않는다", () => {
    expect(formatSeriesLabel("2026-11-14T23:30:00.000Z", "day")).toBe("11. 14.");
  });
});
