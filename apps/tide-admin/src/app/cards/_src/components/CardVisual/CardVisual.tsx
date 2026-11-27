"use client";

import { CheckIcon, NfcIcon } from "@tide-design/icons";

import type { PaymentCard } from "../../apis/cards/cards.types";
import { formatCardExpiry } from "../../libs/formatCardExpiry";
import { CardBrandMark } from "./components/CardBrandMark";
import { CardChip } from "./components/CardChip";
import { useCardTilt } from "./hooks/useCardTilt";

export interface CardVisualProps {
  card: PaymentCard;
}

/**
 * 실물 카드 모양(신용카드 비율 1.586:1). tide에 없어 직접 조립했다(docs/tide-gaps.md).
 * 바탕·광택·물결은 `data-color` accent 토큰을 섞어 그려 테마를 따라간다(`globals.css .pay-card`).
 * 마우스를 올리면 기울고 빛이 따라 움직인다. 고른 상태 모양은 감싼 버튼의 `aria-pressed`를 CSS가 읽어 그린다.
 * 읽는 이름은 이것을 감싼 요소가 준다.
 */
export function CardVisual({ card }: CardVisualProps) {
  const tilt = useCardTilt<HTMLDivElement>();

  return (
    <div aria-hidden data-color={card.color} className="pay-card-stage @container" {...tilt}>
      <div className="pay-card">
        <span className="pay-card__waves" />
        <span className="pay-card__holo" />
        <span className="pay-card__glare" />
        <span className="pay-card__sweep" />
        <div className="pay-card__content flex h-full flex-col justify-between p-5 text-start">
          <div className="flex items-center justify-between">
            <span className="flex items-center text-label-md">
              <span className="pay-card__check">
                <CheckIcon />
              </span>
              <span className="opacity-90">{card.nickname}</span>
            </span>
            <NfcIcon className="opacity-80" />
          </div>
          <div className="flex flex-col gap-3">
            <CardChip />
            <p className="pay-card__number font-mono text-label-lg tracking-wider whitespace-nowrap @xs:text-heading-sm">
              •••• •••• •••• {card.last4}
            </p>
          </div>
          <div className="flex items-end justify-between gap-2">
            <div className="flex gap-4 @xs:gap-6">
              <div className="flex flex-col">
                <span className="text-caption opacity-75">CARD HOLDER</span>
                <span className="text-label-md">{card.holder}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-caption opacity-75">VALID THRU</span>
                <span className="font-mono text-label-md">
                  {formatCardExpiry(card.expMonth, card.expYear)}
                </span>
              </div>
            </div>
            <CardBrandMark brand={card.brand} />
          </div>
        </div>
      </div>
    </div>
  );
}
