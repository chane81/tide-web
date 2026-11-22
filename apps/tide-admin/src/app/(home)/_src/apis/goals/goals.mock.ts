import type { GetGoalsResponse } from "./goals.types";

/**
 * 이번 달 목표 목업. 현재 값은 개요 지표 목업(30일)과 맞춘다.
 * MRR은 지금 MRR, 신규 회원은 30일 동안 늘어난 전체 회원(4,862 − 4,598), 열람률은 지금 열람률이다.
 */
export const goalsMock: GetGoalsResponse = {
  month: new Date(Date.UTC(2026, 10, 1)).toISOString(),
  items: [
    { id: "mrr", label: "MRR", current: 48_230, target: 50_000, unit: "currency" },
    { id: "new-members", label: "신규 회원", current: 264, target: 300, unit: "count" },
    { id: "email-open-rate", label: "메일 열람률", current: 0.482, target: 0.5, unit: "rate" },
  ],
};
