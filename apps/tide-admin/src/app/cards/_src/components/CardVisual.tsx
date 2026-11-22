import { NfcIcon } from "@tide-design/icons";

import type { PaymentCard } from "../apis/cards/cards.types";
import { BRAND_LABELS } from "../constants/transactions";
import { formatCardExpiry } from "../libs/formatCardExpiry";

export interface CardVisualProps {
  card: PaymentCard;
}

/**
 * 실물 카드 모양(신용카드 비율 1.586:1). tide에 없어 직접 조립했다(docs/tide-gaps.md).
 * 색은 `data-color` + accent 토큰이라 테마를 따라간다. 읽는 이름은 이것을 감싼 요소가 준다.
 */
export function CardVisual({ card }: CardVisualProps) {
  return (
    <div
      data-color={card.color}
      aria-hidden
      className="flex aspect-[1.586] w-full flex-col justify-between rounded-xl bg-accent-solid p-5 text-start text-accent-on-solid shadow-md"
    >
      <div className="flex items-center justify-between">
        <span className="text-label-md">{card.nickname}</span>
        <NfcIcon />
      </div>
      <p className="font-mono text-heading-sm tracking-widest">•••• {card.last4}</p>
      <div className="flex items-end justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-caption">{card.holder}</span>
          <span className="font-mono text-label-md">
            {formatCardExpiry(card.expMonth, card.expYear)}
          </span>
        </div>
        <span className="text-label-lg">{BRAND_LABELS[card.brand]}</span>
      </div>
    </div>
  );
}
