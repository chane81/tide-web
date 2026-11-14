import { formatRelativeTime } from "./formatRelativeTime";

const NOW = Date.UTC(2026, 10, 14, 0, 0, 0);
const ago = (ms: number) => new Date(NOW - ms).toISOString();

describe("formatRelativeTime", () => {
  it("1분 안이면 방금", () => {
    expect(formatRelativeTime(ago(30 * 1000), NOW)).toBe("방금");
  });

  it("분·시간·일 단위로 쓴다", () => {
    expect(formatRelativeTime(ago(4 * 60 * 1000), NOW)).toBe("4분 전");
    expect(formatRelativeTime(ago(3 * 60 * 60 * 1000), NOW)).toBe("3시간 전");
    expect(formatRelativeTime(ago(24 * 60 * 60 * 1000), NOW)).toBe("어제");
    expect(formatRelativeTime(ago(3 * 24 * 60 * 60 * 1000), NOW)).toBe("3일 전");
  });
});
