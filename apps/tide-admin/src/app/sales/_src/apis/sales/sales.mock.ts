import { seededRandom } from "@/libs/seededRandom";
import { portraitUrl } from "@/libs/portraitUrl";

import type {
  GetMonthlyOrdersResponse,
  GetSalesKpisResponse,
  GetSalesReportResponse,
  Purchase,
  SalesReportPoint,
} from "./sales.types";

/** 목업 기준 시각. `Date.now()`를 쓰지 않아 결과가 늘 같다. */
const ANCHOR = Date.UTC(2026, 10, 14, 0, 0, 0);
const DAY = 24 * 60 * 60 * 1000;

/** 오늘 시간대별 추이의 점 개수(0시~23시) */
const HOURS = 24;

/** 시간별 비중. 낮에 많고 새벽에 적은 곡선을 흔든다. */
function buildHourlyWeights(seed: number): number[] {
  const random = seededRandom(seed);

  return Array.from({ length: HOURS }, (_, hour) => {
    const daytime = Math.max(0, Math.sin(((hour - 6) / 16) * Math.PI));
    return (0.15 + daytime) * (0.7 + random() * 0.6);
  });
}

/** 비중을 누적해 `total`로 맞춘다. 마지막 값이 늘 `total`이라 KPI 숫자와 어긋나지 않는다. */
function accumulate(weights: number[], total: number): number[] {
  const sum = weights.reduce((a, b) => a + b, 0);
  let running = 0;

  return weights.map((weight) => {
    running += weight;
    return Math.round((total * running) / sum);
  });
}

const revenue = { current: 12_480, previous: 11_215 };
const orders = { current: 164, previous: 171 };

const revenueWeights = buildHourlyWeights(301);
const ordersJitter = seededRandom(302);
/** 주문 수는 매출 비중을 ±10%만 흔든다. 따로 만들면 평균 주문 금액 추이가 크게 튄다. */
const ordersWeights = revenueWeights.map((weight) => weight * (0.9 + ordersJitter() * 0.2));

export const salesKpisMock: GetSalesKpisResponse = {
  revenue,
  orders,
  hourly: {
    revenue: accumulate(revenueWeights, revenue.current),
    orders: accumulate(ordersWeights, orders.current),
  },
};

/** 이번 기간·지난 기간 매출 시계열. 지난 기간은 이번 기간보다 조금 낮게 흔든다. */
function buildReport(
  seed: number,
  count: number,
  at: (i: number) => Date,
  base: number,
): SalesReportPoint[] {
  const random = seededRandom(seed);

  return Array.from({ length: count }, (_, i) => {
    const wave = 1 + Math.sin(i / 2) * 0.08;
    const current = Math.round(base * wave * (1 + (random() - 0.4) * 0.2));
    const previous = Math.round(base * 0.9 * wave * (1 + (random() - 0.5) * 0.2));

    return { at: at(i).toISOString(), current, previous };
  });
}

const anchor = new Date(ANCHOR);
const monthAt = (offsetFromEnd: number) =>
  new Date(Date.UTC(anchor.getUTCFullYear(), anchor.getUTCMonth() - offsetFromEnd, 1));

export const salesReportMock: GetSalesReportResponse = {
  "12m": buildReport(512, 12, (i) => monthAt(11 - i), 310_000),
  "30d": buildReport(530, 30, (i) => new Date(ANCHOR - (29 - i) * DAY), 10_400),
  "7d": buildReport(507, 7, (i) => new Date(ANCHOR - (6 - i) * DAY), 11_800),
};

const ordersRandom = seededRandom(712);

export const monthlyOrdersMock: GetMonthlyOrdersResponse = {
  items: Array.from({ length: 12 }, (_, i) => ({
    month: monthAt(11 - i).toISOString(),
    orders: Math.round(3_600 + i * 120 + (ordersRandom() - 0.5) * 900),
  })),
};

/** 구매 목록 기준 시각 */
export const purchasesAsOf = new Date(ANCHOR).toISOString();

const minutesAgo = (m: number) => new Date(ANCHOR - m * 60 * 1000).toISOString();

/** 정민준은 사진이 없어 fallback 아이콘이 보인다. */
export const recentPurchasesMock: Purchase[] = [
  {
    id: "p-1",
    customer: { name: "박서연", avatarUrl: portraitUrl("women", 44) },
    product: { name: "Pro 플랜 (연간)", href: "/sales#pro-yearly" },
    amount: 1_188,
    purchasedAt: minutesAgo(4),
  },
  {
    id: "p-2",
    customer: { name: "이도윤", avatarUrl: portraitUrl("men", 32) },
    product: { name: "추가 좌석 5개", href: "/sales#seats" },
    amount: 250,
    purchasedAt: minutesAgo(18),
  },
  {
    id: "p-3",
    customer: { name: "최지우", avatarUrl: portraitUrl("women", 65) },
    product: { name: "Team 플랜 (월간)", href: "/sales#team-monthly" },
    amount: 299,
    purchasedAt: minutesAgo(47),
  },
  {
    id: "p-4",
    customer: { name: "정민준" },
    product: { name: "API 사용량 추가", href: "/sales#api-usage" },
    amount: 80,
    purchasedAt: minutesAgo(95),
  },
  {
    id: "p-5",
    customer: { name: "강하은", avatarUrl: portraitUrl("women", 17) },
    product: { name: "Pro 플랜 (월간)", href: "/sales#pro-monthly" },
    amount: 99,
    purchasedAt: minutesAgo(180),
  },
];
