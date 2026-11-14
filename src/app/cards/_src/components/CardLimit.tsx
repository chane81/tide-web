import { Card, Progress, Typography } from "@tide-design/components";

import { formatCurrency } from "@/libs/formatCurrency";

import type { PaymentCard } from "../apis/cards.types";
import { getLimitUsage } from "../libs/getLimitUsage";

export interface CardLimitProps {
  card: PaymentCard;
}

/** 고른 카드의 이번 달 사용액과 한도 사용률 */
export function CardLimit({ card }: CardLimitProps) {
  const usage = getLimitUsage(card.balance, card.limit);

  return (
    <Card
      render={<section aria-labelledby="card-limit-title" />}
      className="flex flex-col gap-4 p-6"
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
    </Card>
  );
}
