import type { GoalUnit } from "@/apis/goals.types";

import { formatCurrency } from "./formatCurrency";
import { formatNumber } from "./formatNumber";
import { formatPercent } from "./formatPercent";

/** 목표 값을 단위대로 쓴다. 예: `$48,230`, `264`, `48.2%` */
export function formatGoalValue(value: number, unit: GoalUnit): string {
  if (unit === "currency") return formatCurrency(value);
  if (unit === "rate") return formatPercent(value);

  return formatNumber(value);
}
