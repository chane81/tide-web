import type { Role } from "@tide-design/components";

export interface LimitUsage {
  /** 한도 사용률(0~1). 한도를 넘으면 1보다 크다. */
  rate: number;
  /** Progress 색. 80% 이상 warning, 100% 이상 danger */
  color: Extract<Role, "primary" | "warning" | "danger">;
}

/** 사용액과 한도로 사용률과 Progress 색을 정한다. 한도가 0 이하면 사용률 0이다. */
export function getLimitUsage(balance: number, limit: number): LimitUsage {
  const rate = limit > 0 ? balance / limit : 0;
  const color = rate >= 1 ? "danger" : rate >= 0.8 ? "warning" : "primary";

  return { rate, color };
}
