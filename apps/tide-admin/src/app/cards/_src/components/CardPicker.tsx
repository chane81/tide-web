import type { CSSProperties } from "react";

import type { PaymentCard } from "../apis/cards/cards.types";
import { BRAND_LABELS } from "../constants/transactions";
import { formatCardExpiry } from "../libs/formatCardExpiry";
import { getDeckPositions } from "../libs/getDeckPositions";
import { CardVisual } from "./CardVisual";

export interface CardPickerProps {
  cards: PaymentCard[];
  selectedId: string;
  onSelect: (id: string) => void;
}

/**
 * 카드 비주얼 목록. 누르면 그 카드를 고른다. tide에 고를 수 있는 타일(choice card)이 없어
 * `aria-pressed` 버튼으로 조립했다(docs/tide-gaps.md). 고른 카드는 떠오르고 빛무리·체크가 붙는다(`globals.css .pay-card`).
 * 넓은 화면에서는 한 줄로 늘어놓고, 좁은 화면에서는 고른 카드를 맨 앞에 두고 살짝 기울여 겹쳐 쌓는다(`globals.css .pay-card-deck`).
 * 두 배치를 transform만으로 잡아 폭이 바뀌면 자연스럽게 이어진다. 장 수(`--deck-count`), 원래 순서(`--deck-index`),
 * 쌓인 자리(`--deck-pos`, 0 = 맨 앞)를 CSS 변수로 넘긴다.
 */
export function CardPicker({ cards, selectedId, onSelect }: CardPickerProps) {
  const positions = getDeckPositions(
    cards.map((card) => card.id),
    selectedId,
  );

  return (
    <ul
      aria-label="내 카드"
      className="pay-card-deck"
      style={{ "--deck-count": cards.length } as CSSProperties}
    >
      {cards.map((card, index) => {
        const selected = card.id === selectedId;
        const position = positions.get(card.id) ?? 0;

        return (
          <li
            key={card.id}
            className="pay-card-deck__item"
            style={
              {
                "--deck-index": index,
                "--deck-pos": position,
                zIndex: cards.length - position,
              } as CSSProperties
            }
          >
            <button
              type="button"
              aria-pressed={selected}
              aria-label={`${card.nickname} ${BRAND_LABELS[card.brand]} 끝자리 ${card.last4}, 만료 ${formatCardExpiry(card.expMonth, card.expYear)}`}
              onClick={() => onSelect(card.id)}
              className="pay-card-button block w-full cursor-pointer rounded-2xl focus-visible:focus-ring"
            >
              <CardVisual card={card} />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
