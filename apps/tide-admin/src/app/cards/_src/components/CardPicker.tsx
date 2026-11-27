import type { PaymentCard } from "../apis/cards/cards.types";
import { BRAND_LABELS } from "../constants/transactions";
import { formatCardExpiry } from "../libs/formatCardExpiry";
import { CardVisual } from "./CardVisual";

export interface CardPickerProps {
  cards: PaymentCard[];
  selectedId: string;
  onSelect: (id: string) => void;
}

/**
 * 카드 비주얼 목록. 누르면 그 카드를 고른다. tide에 고를 수 있는 타일(choice card)이 없어
 * `aria-pressed` 버튼으로 조립했다(docs/tide-gaps.md). 고른 카드는 떠오르고 빛무리·체크가 붙는다(`globals.css .pay-card`).
 */
export function CardPicker({ cards, selectedId, onSelect }: CardPickerProps) {
  return (
    <ul aria-label="내 카드" className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => {
        const selected = card.id === selectedId;
        return (
          <li key={card.id}>
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
