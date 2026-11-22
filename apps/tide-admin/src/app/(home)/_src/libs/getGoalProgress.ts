export interface GoalProgress {
  /** 달성률(0.96 = 96%). 목표를 넘으면 1보다 크다. 목표가 0 이하면 0이다. */
  rate: number;
  /** 목표까지 남은 값. 이미 넘었으면 0이다. */
  remaining: number;
  /** 목표에 닿았는가 */
  achieved: boolean;
}

/** 현재 값과 목표 값으로 달성률·남은 값·달성 여부를 낸다. */
export function getGoalProgress(current: number, target: number): GoalProgress {
  if (target <= 0) return { rate: 0, remaining: 0, achieved: false };

  return {
    rate: current / target,
    remaining: Math.max(0, target - current),
    achieved: current >= target,
  };
}
