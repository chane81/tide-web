import type { Role } from "@tide-design/components";

/** VIP로 보는 누적 결제 금액(달러) */
export const VIP_MIN_SPENT = 3000;
/** 단골로 보는 주문 수 */
export const LOYAL_MIN_ORDERS = 10;

export type SegmentId = "vip" | "loyal" | "regular" | "dormant" | "churned";

export interface Segment {
  id: SegmentId;
  label: string;
  description: string;
  color: Role;
}

/** 표에 보이는 순서. 고객은 위에서부터 처음 맞는 세그먼트 하나에만 들어간다. */
export const SEGMENTS: readonly Segment[] = [
  { id: "vip", label: "VIP", description: "활성 · 누적 결제 $3,000 이상", color: "primary" },
  { id: "loyal", label: "단골", description: "활성 · 주문 10건 이상", color: "success" },
  { id: "regular", label: "일반", description: "그 밖의 활성 고객", color: "info" },
  { id: "dormant", label: "휴면", description: "최근 활동이 없는 고객", color: "warning" },
  { id: "churned", label: "이탈", description: "서비스를 떠난 고객", color: "danger" },
];
