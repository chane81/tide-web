import { Card, Progress, Separator, Typography } from "@tide-design/components";

import { Sparkline } from "@/components/Sparkline";
import { formatCurrency } from "@/libs/formatCurrency";

import type { PaymentCard, Transaction } from "../apis/cards.types";
import { getLimitUsage } from "../libs/getLimitUsage";
import { sumByDay } from "../libs/sumByDay";

export interface CardLimitProps {
  card: PaymentCard;
  /** 고른 카드의 거래. 일별 사용 추이를 낸다. */
  transactions: Transaction[];
}

/** 고른 카드의 이번 달 사용액, 한도 사용률, 일별 사용 추이 */
export function CardLimit({ card, transactions }: CardLimitProps) {
  const usage = getLimitUsage(card.balance, card.limit);
  const daily = sumByDay(transactions);
  const peak = daily.reduce((max, day) => Math.max(max, day.amount), 0);

  return (
    <Card
      render={<section aria-labelledby="card-limit-title" />}
      className="flex flex-col gap-4 p-6 shadow-sm"
    >
      <div className="flex flex-col gap-1">
        <Typography variant="heading-sm" level={2} id="card-limit-title">
          이번 달 사용액
        </Typography>
        <Typography variant="body-sm" className="text-muted">
          {card.nickname} 카드 · 끝자리 {card.last4}
        </Typography>
      </div>
      <Typography variant="heading-lg" render={<p />}>
        {formatCurrency(card.balance)}
      </Typography>
      <div className="flex flex-col gap-2">
        <Progress
          aria-label="한도 사용률"
          value={card.balance}
          max={card.limit}
          color={usage.color}
        />
        <div className="flex justify-between text-body-sm text-muted">
          <span>한도 {formatCurrency(card.limit)}</span>
          <span>{Math.round(usage.rate * 100)}% 사용</span>
        </div>
      </div>
      {daily.length > 1 && (
        // 옆 카드(카테고리별 지출)와 높이를 맞출 때 남는 공간은 추이 위에 둔다.
        <div className="mt-auto flex flex-col gap-3">
          <Separator decorative />
          <div className="flex items-baseline justify-between gap-2">
            <Typography variant="heading-xs" level={3}>
              이번 달 일별 사용
            </Typography>
            <Typography variant="body-sm" className="text-muted tabular-nums">
              최고 {formatCurrency(peak)}
            </Typography>
          </div>
          <Sparkline
            values={daily.map((day) => day.amount)}
            title={`${card.nickname} 카드 이번 달 일별 사용 추이`}
            height={64}
          />
          <div className="flex justify-between text-caption text-muted tabular-nums">
            <span>{Number(daily[0]?.date.slice(8))}일</span>
            <span>{Number(daily.at(-1)?.date.slice(8))}일</span>
          </div>
        </div>
      )}
    </Card>
  );
}
