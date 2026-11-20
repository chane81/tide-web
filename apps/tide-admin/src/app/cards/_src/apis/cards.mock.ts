import { seededRandom } from "@/libs/seededRandom";

import type { PaymentCard, SpendingCategory, Transaction, TransactionStatus } from "./cards.types";

/** 목업 기준 시각. `Date.now()`를 쓰지 않아 서버·클라이언트·테스트 결과가 같다. */
const ANCHOR = Date.UTC(2026, 10, 14, 0, 0, 0);
const HOUR = 60 * 60 * 1000;

/** 카테고리별 가맹점과 금액 범위(달러) */
const MERCHANTS: Record<SpendingCategory, { names: string[]; min: number; max: number }> = {
  food: { names: ["블루보틀 성수", "샐러디 역삼", "마켓컬리", "배달의민족"], min: 6, max: 60 },
  shopping: { names: ["무신사", "쿠팡", "29CM", "오늘의집"], min: 20, max: 240 },
  transport: { names: ["카카오 T", "코레일", "티머니"], min: 3, max: 45 },
  travel: { names: ["대한항공", "에어비앤비", "야놀자"], min: 120, max: 680 },
  subscription: { names: ["Figma", "Notion", "GitHub", "Vercel"], min: 8, max: 45 },
};

const CATEGORIES = Object.keys(MERCHANTS) as SpendingCategory[];

type CardSeed = Omit<PaymentCard, "balance">;

const cardSeeds: CardSeed[] = [
  {
    id: "card-1",
    brand: "visa",
    nickname: "개인",
    holder: "KIM HANEUL",
    last4: "4821",
    expMonth: 8,
    expYear: 2029,
    color: "blue",
    limit: 5_000,
  },
  {
    id: "card-2",
    brand: "mastercard",
    nickname: "업무용",
    holder: "KIM HANEUL",
    last4: "1907",
    expMonth: 3,
    expYear: 2028,
    color: "purple",
    limit: 3_000,
  },
  {
    id: "card-3",
    brand: "amex",
    nickname: "여행",
    holder: "KIM HANEUL",
    last4: "3005",
    expMonth: 11,
    expYear: 2027,
    color: "mint",
    limit: 2_000,
  },
];

/** 카드마다 거래 개수. 페이지 수가 서로 달라 Pagination 모양이 바뀌는지 볼 수 있다. */
const TRANSACTION_COUNTS: Record<string, number> = { "card-1": 34, "card-2": 17, "card-3": 6 };

function pick<T>(items: readonly T[], random: () => number): T {
  return items[Math.floor(random() * items.length)] as T;
}

function status(random: () => number, index: number): TransactionStatus {
  // 가장 최근 두 건은 대기, 나머지는 열에 하나꼴로 취소
  if (index < 2) return "pending";
  return random() < 0.1 ? "canceled" : "completed";
}

function buildTransactions(card: CardSeed, seed: number): Transaction[] {
  const random = seededRandom(seed);
  let at = ANCHOR;

  return Array.from({ length: TRANSACTION_COUNTS[card.id] ?? 0 }, (_, i) => {
    at -= Math.round((4 + random() * 20) * HOUR);
    const category = pick(CATEGORIES, random);
    const { names, min, max } = MERCHANTS[category];

    return {
      id: `${card.id}-tx-${i + 1}`,
      cardId: card.id,
      merchant: pick(names, random),
      category,
      occurredAt: new Date(at).toISOString(),
      amount: Math.round(min + random() * (max - min)),
      status: status(random, i),
    };
  });
}

/** 모든 카드의 거래, 최신순 */
export const transactionsMock: Transaction[] = cardSeeds
  .flatMap((card, i) => buildTransactions(card, (i + 1) * 101))
  .toSorted((a, b) => b.occurredAt.localeCompare(a.occurredAt));

export const cardsMock: PaymentCard[] = cardSeeds.map((card) => ({
  ...card,
  balance: transactionsMock
    .filter((tx) => tx.cardId === card.id && tx.status !== "canceled")
    .reduce((sum, tx) => sum + tx.amount, 0),
}));
