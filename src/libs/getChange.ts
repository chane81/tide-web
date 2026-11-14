export type ChangeDirection = "up" | "down" | "flat";

export interface Change {
  /** 지난 값 대비 변화율(0.12 = 12%). 지난 값이 0이면 비율을 낼 수 없어 `null`이다. */
  rate: number | null;
  direction: ChangeDirection;
}

/** 반올림해 0.0%로 보이는 변화는 같음으로 본다. */
const FLAT_THRESHOLD = 0.0005;

/** 이번 값과 지난 값으로 증감률과 방향(증가·감소·같음)을 낸다. */
export function getChange(current: number, previous: number): Change {
  if (previous === 0) {
    return { rate: null, direction: current > 0 ? "up" : current < 0 ? "down" : "flat" };
  }

  const rate = (current - previous) / Math.abs(previous);
  if (Math.abs(rate) < FLAT_THRESHOLD) return { rate: 0, direction: "flat" };

  return { rate, direction: rate > 0 ? "up" : "down" };
}
