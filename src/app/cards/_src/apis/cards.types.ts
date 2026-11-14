import type { ColorFamilyName } from "@tide-design/components";

/** 카드 브랜드 */
export type CardBrand = "visa" | "mastercard" | "amex";

/** 결제 카드 하나. tide `Card` 컴포넌트와 헷갈리지 않게 `PaymentCard`라 부른다. */
export interface PaymentCard {
  id: string;
  brand: CardBrand;
  /** 사용자가 붙인 이름. 예: `업무용` */
  nickname: string;
  holder: string;
  /** 카드 번호 끝 네 자리 */
  last4: string;
  /** 만료 월(1~12) */
  expMonth: number;
  /** 만료 연도(4자리) */
  expYear: number;
  /** 카드 비주얼 색(tide 색 계열) */
  color: ColorFamilyName;
  /** 이번 달 사용액(달러). 취소를 뺀 거래 합계다. */
  balance: number;
  /** 월 한도(달러) */
  limit: number;
}

/** 거래 상태: 완료·대기·취소 */
export type TransactionStatus = "completed" | "pending" | "canceled";

/** 지출 카테고리 */
export type SpendingCategory = "food" | "shopping" | "transport" | "travel" | "subscription";

/** 카드 거래 하나 */
export interface Transaction {
  id: string;
  cardId: string;
  merchant: string;
  category: SpendingCategory;
  /** 거래 시각(ISO 8601, UTC) */
  occurredAt: string;
  /** 금액(달러) */
  amount: number;
  status: TransactionStatus;
}

/** `getCards` 응답 */
export interface GetCardsResponse {
  items: PaymentCard[];
}

/** `getTransactions` 응답: 모든 카드의 거래(최신순). 카드 고르기·페이지 나누기는 client에서 한다. */
export interface GetTransactionsResponse {
  items: Transaction[];
}
