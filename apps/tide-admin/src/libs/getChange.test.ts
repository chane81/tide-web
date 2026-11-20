import { getChange } from "./getChange";

describe("getChange", () => {
  it("늘면 up과 양의 비율", () => {
    expect(getChange(120, 100)).toEqual({ rate: 0.2, direction: "up" });
  });

  it("줄면 down과 음의 비율", () => {
    expect(getChange(75, 100)).toEqual({ rate: -0.25, direction: "down" });
  });

  it("같거나 0.0%로 보일 만큼 작으면 flat", () => {
    expect(getChange(100, 100)).toEqual({ rate: 0, direction: "flat" });
    expect(getChange(100_004, 100_000)).toEqual({ rate: 0, direction: "flat" });
  });

  it("지난 값이 0이면 비율 없이 방향만 낸다", () => {
    expect(getChange(5, 0)).toEqual({ rate: null, direction: "up" });
    expect(getChange(0, 0)).toEqual({ rate: null, direction: "flat" });
  });

  it("지난 값이 음수여도 방향이 맞다", () => {
    expect(getChange(-50, -100).direction).toBe("up");
  });
});
