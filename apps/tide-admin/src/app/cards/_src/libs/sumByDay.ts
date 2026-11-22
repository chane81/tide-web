import type { Transaction } from "../apis/cards/cards.types";

export interface DailySpending {
  /** 날짜(UTC, `YYYY-MM-DD`) */
  date: string;
  /** 그날 합계(달러) */
  amount: number;
}

const DAY = 24 * 60 * 60 * 1000;

/**
 * 가장 최근 거래가 있는 달의 1일부터 그 거래 날짜까지 일별 합계, 날짜 순.
 * 거래가 없는 날은 0으로 채워 추이가 끊기지 않게 한다. 취소된 거래는 빼고, 날짜는 UTC로 나눈다.
 */
export function sumByDay(transactions: readonly Transaction[]): DailySpending[] {
  const counted = transactions.filter((tx) => tx.status !== "canceled");
  if (counted.length === 0) return [];

  const latest = counted.reduce((max, tx) => (tx.occurredAt > max ? tx.occurredAt : max), "");
  const month = latest.slice(0, 7);
  const sums = new Map<string, number>();

  for (const tx of counted) {
    const date = tx.occurredAt.slice(0, 10);
    if (!date.startsWith(month)) continue;
    sums.set(date, (sums.get(date) ?? 0) + tx.amount);
  }

  const start = Date.parse(`${month}-01T00:00:00.000Z`);
  const end = Date.parse(`${latest.slice(0, 10)}T00:00:00.000Z`);
  const days: DailySpending[] = [];

  for (let at = start; at <= end; at += DAY) {
    const date = new Date(at).toISOString().slice(0, 10);
    days.push({ date, amount: sums.get(date) ?? 0 });
  }

  return days;
}
