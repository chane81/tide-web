import type { Role } from "@tide-design/components";

import type { CardBrand, SpendingCategory, TransactionStatus } from "../apis/cards.types";

/** 거래 표 한 페이지 행 수 */
export const TRANSACTIONS_PAGE_SIZE = 8;

/** 거래 상태 이름과 Badge 색 */
export const TRANSACTION_STATUS: Record<TransactionStatus, { label: string; color: Role }> = {
  completed: { label: "완료", color: "success" },
  pending: { label: "대기", color: "warning" },
  canceled: { label: "취소", color: "danger" },
};

export const CATEGORY_LABELS: Record<SpendingCategory, string> = {
  food: "식비",
  shopping: "쇼핑",
  transport: "교통",
  travel: "여행",
  subscription: "구독",
};

export const BRAND_LABELS: Record<CardBrand, string> = {
  visa: "VISA",
  mastercard: "Mastercard",
  amex: "AMEX",
};
