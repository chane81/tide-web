import type { ColorFamilyName } from "@tide-design/components";

/** 고객 상태: 활성·휴면·이탈 */
export type CustomerStatus = "active" | "dormant" | "churned";

/** 고객 한 명 */
export interface Customer {
  id: string;
  name: string;
  email: string;
  status: CustomerStatus;
  /** 가입 시각(ISO 8601, UTC) */
  joinedAt: string;
  /** 마지막 접속 시각(ISO 8601, UTC) */
  lastSeenAt: string;
  /** 주문 수 */
  orders: number;
  /** 누적 결제 금액(달러) */
  totalSpent: number;
  /** 이미지가 없을 때 Avatar fallback 색 */
  avatarColor: ColorFamilyName;
}

/** `getCustomers` 응답: 모든 고객. 검색·필터·정렬·페이지는 client에서 한다. */
export interface GetCustomersResponse {
  items: Customer[];
}
