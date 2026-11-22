import type { Customer, CustomerStatus } from "../apis/customers/customers.types";

export interface CustomerSummary {
  /** 전체 고객 수 */
  total: number;
  /** 상태별 고객 수 */
  byStatus: Record<CustomerStatus, number>;
  /** 전체 누적 결제 금액(달러) */
  totalSpent: number;
  /** 고객 한 명당 평균 결제 금액(달러). 고객이 없으면 0 */
  averageSpent: number;
}

/** 고객 표 위 요약 지표: 전체·상태별 고객 수와 결제 금액 합계·평균 */
export function summarizeCustomers(customers: readonly Customer[]): CustomerSummary {
  const byStatus: Record<CustomerStatus, number> = { active: 0, dormant: 0, churned: 0 };
  let totalSpent = 0;

  for (const customer of customers) {
    byStatus[customer.status] += 1;
    totalSpent += customer.totalSpent;
  }

  const total = customers.length;

  return { total, byStatus, totalSpent, averageSpent: total === 0 ? 0 : totalSpent / total };
}
