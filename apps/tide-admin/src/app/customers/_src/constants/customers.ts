import type { Role } from "@tide-design/components";

import type { CustomerStatus } from "../apis/customers/customers.types";

/** 고객 표 한 페이지 행 수 */
export const CUSTOMERS_PAGE_SIZE = 10;

/** 상태 이름과 Badge 색 */
export const CUSTOMER_STATUS: Record<CustomerStatus, { label: string; color: Role }> = {
  active: { label: "활성", color: "success" },
  dormant: { label: "휴면", color: "warning" },
  churned: { label: "이탈", color: "neutral" },
};

/** 상태 필터 Select 항목 순서 */
export const CUSTOMER_STATUS_ORDER: CustomerStatus[] = ["active", "dormant", "churned"];
