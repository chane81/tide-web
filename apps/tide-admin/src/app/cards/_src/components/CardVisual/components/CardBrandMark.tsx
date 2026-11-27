import type { CardBrand } from "../../../apis/cards/cards.types";

export interface CardBrandMarkProps {
  brand: CardBrand;
}

/** 카드 오른쪽 아래 브랜드 표시. 실제 로고 대신 tide 색·글자로 비슷한 모양만 낸다. */
export function CardBrandMark({ brand }: CardBrandMarkProps) {
  if (brand === "mastercard") {
    return (
      <span className="flex items-center">
        <span className="size-7 rounded-full bg-(--tide-color-red-500)" />
        <span className="-ms-3 size-7 rounded-full bg-(--tide-color-amber-400) opacity-85" />
      </span>
    );
  }

  if (brand === "amex") {
    return (
      <span className="rounded-sm border-[1.5px] border-current px-1.5 py-0.5 text-label-md font-bold tracking-wider">
        AMEX
      </span>
    );
  }

  return <span className="text-heading-sm font-extrabold tracking-tight italic">VISA</span>;
}
