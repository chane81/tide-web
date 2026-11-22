import type { NpmPackage } from "../apis/npmPackages/npmPackages.types";
import { MISSING, formatDay, summarizeNpmPackages } from "./summarizeNpmPackages";

const pkg = (name: string, over: Partial<NpmPackage> = {}): NpmPackage => ({
  name,
  version: "0.11.5",
  downloads: 1000,
  start: "2026-11-07",
  end: "2026-11-13",
  ...over,
});

describe("formatDay", () => {
  it("YYYY-MM-DD를 「M월 D일」로 바꾼다", () => {
    expect(formatDay("2026-01-07")).toBe("1월 7일");
  });

  it("형식이 다르면 null", () => {
    expect(formatDay("11/07")).toBeNull();
  });
});

describe("summarizeNpmPackages", () => {
  it("짧은 이름, 천 단위 쉼표, 합계, 기간, 같은 버전을 만든다", () => {
    const summary = summarizeNpmPackages([
      pkg("@tide-design/components", { downloads: 871 }),
      pkg("@tide-design/icons", { downloads: 1894 }),
    ]);

    expect(summary.rows[1]).toEqual({
      name: "@tide-design/icons",
      label: "icons",
      version: "0.11.5",
      downloads: "1,894회",
    });
    expect(summary.total).toBe("2,765회");
    expect(summary.period).toBe("11월 7일 ~ 11월 13일");
    expect(summary.sharedVersion).toBe("0.11.5");
  });

  it("값이 빠지면 그 칸은 안내 말, 합계는 null", () => {
    const summary = summarizeNpmPackages([
      pkg("@tide-design/components", { downloads: null, start: null, end: null }),
      pkg("@tide-design/icons", { version: null }),
    ]);

    expect(summary.rows[0]?.downloads).toBe(MISSING);
    expect(summary.rows[1]?.version).toBe(MISSING);
    expect(summary.total).toBeNull();
    expect(summary.period).toBe("11월 7일 ~ 11월 13일");
    expect(summary.sharedVersion).toBeNull();
  });
});
