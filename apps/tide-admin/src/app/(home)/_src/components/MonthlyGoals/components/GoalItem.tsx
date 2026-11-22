import { Progress, Typography } from "@tide-design/components";

import { formatPercent } from "@/libs/formatPercent";

import type { Goal } from "../../../apis/goals/goals.types";
import { formatGoalValue } from "../../../libs/formatGoalValue";
import { getGoalProgress } from "../../../libs/getGoalProgress";

export interface GoalItemProps {
  goal: Goal;
}

/** 목표 한 칸: 이름, 현재 값/목표 값, 진행 막대, 달성률과 남은 값 */
export function GoalItem({ goal }: GoalItemProps) {
  const { rate, remaining, achieved } = getGoalProgress(goal.current, goal.target);
  const labelId = `goal-${goal.id}`;

  return (
    <li className="flex flex-col gap-2">
      <Typography variant="label-md" id={labelId} className="text-muted">
        {goal.label}
      </Typography>
      <p className="flex flex-wrap items-baseline gap-1">
        <Typography variant="heading-xs" render={<span />}>
          {formatGoalValue(goal.current, goal.unit)}
        </Typography>
        <Typography variant="body-sm" render={<span />} className="text-muted">
          / {formatGoalValue(goal.target, goal.unit)}
        </Typography>
      </p>
      <Progress
        value={goal.current}
        max={goal.target}
        size="sm"
        color={achieved ? "success" : "primary"}
        aria-labelledby={labelId}
      />
      <Typography variant="caption" className="text-muted">
        {formatPercent(rate)} 달성
        {achieved ? "" : ` · ${formatGoalValue(remaining, goal.unit)} 남음`}
      </Typography>
    </li>
  );
}
