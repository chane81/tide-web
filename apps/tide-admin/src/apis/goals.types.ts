/** 목표 값의 단위. 화면에서 이 단위로 숫자를 쓴다. */
export type GoalUnit = "currency" | "count" | "rate";

/** 이번 달 목표 하나 */
export interface Goal {
  id: string;
  /** 목표 이름(「MRR」 등) */
  label: string;
  /** 지금까지 달성한 값 */
  current: number;
  /** 목표 값 */
  target: number;
  unit: GoalUnit;
}

/** `getGoals` 응답: 이번 달 목표 목록 */
export interface GetGoalsResponse {
  /** 목표 기간의 첫날. ISO 8601(UTC) */
  month: string;
  items: Goal[];
}
