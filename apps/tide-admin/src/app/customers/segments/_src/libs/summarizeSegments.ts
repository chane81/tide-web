import type { Customer } from "../../../_src/apis/customers.types";
import { LOYAL_MIN_ORDERS, SEGMENTS, VIP_MIN_SPENT } from "../constants/segments";
import type { Segment, SegmentId } from "../constants/segments";

export interface SegmentSummary extends Segment {
  /** 세그먼트 고객 수 */
  count: number;
  /** 전체 고객 중 비율(0~1) */
  share: number;
  /** 누적 결제 금액 합계(달러) */
  totalSpent: number;
  /** 한 명당 평균 결제 금액(달러). 고객이 없으면 0 */
  averageSpent: number;
}

/** 고객 한 명이 속하는 세그먼트. 위쪽 조건이 먼저다. */
export function classifySegment(customer: Customer): SegmentId {
  if (customer.status !== "active") return customer.status;
  if (customer.totalSpent >= VIP_MIN_SPENT) return "vip";
  if (customer.orders >= LOYAL_MIN_ORDERS) return "loyal";

  return "regular";
}

/** 세그먼트별 고객 수·비율·결제 금액. 고객이 없는 세그먼트도 0으로 남긴다. */
export function summarizeSegments(customers: readonly Customer[]): SegmentSummary[] {
  const totals = new Map<SegmentId, { count: number; totalSpent: number }>(
    SEGMENTS.map((segment) => [segment.id, { count: 0, totalSpent: 0 }]),
  );

  for (const customer of customers) {
    const total = totals.get(classifySegment(customer));
    if (!total) continue;
    total.count += 1;
    total.totalSpent += customer.totalSpent;
  }

  return SEGMENTS.map((segment) => {
    const { count, totalSpent } = totals.get(segment.id) ?? { count: 0, totalSpent: 0 };

    return {
      ...segment,
      count,
      totalSpent,
      share: customers.length === 0 ? 0 : count / customers.length,
      averageSpent: count === 0 ? 0 : totalSpent / count,
    };
  });
}
