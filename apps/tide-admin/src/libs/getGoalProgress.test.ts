import { getGoalProgress } from "./getGoalProgress";

describe("getGoalProgress", () => {
  it("목표에 못 미치면 비율과 남은 값을 낸다", () => {
    expect(getGoalProgress(264, 300)).toEqual({ rate: 0.88, remaining: 36, achieved: false });
  });

  it("목표에 닿거나 넘으면 achieved이고 남은 값은 0이다", () => {
    expect(getGoalProgress(300, 300)).toEqual({ rate: 1, remaining: 0, achieved: true });
    expect(getGoalProgress(330, 300)).toEqual({ rate: 1.1, remaining: 0, achieved: true });
  });

  it("목표가 0 이하면 비율을 낼 수 없어 0으로 둔다", () => {
    expect(getGoalProgress(10, 0)).toEqual({ rate: 0, remaining: 0, achieved: false });
  });
});
