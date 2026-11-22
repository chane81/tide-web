import { CollagePiece } from "./CollagePiece";

export interface CountPieceProps {
  /** 큰 숫자(「34종」) */
  count: string;
  /** 숫자 아래 한 줄 */
  label: string;
}

/** 콜라주 가운데 왼쪽의 숫자 조각. 세 벌이 같은 자리·같은 크기로 쓴다. */
export function CountPiece({ count, label }: CountPieceProps) {
  return (
    <CollagePiece x="4%" y="40%" w="30%">
      <span className="cat-count">{count}</span>
      <span className="text-label-sm text-muted">{label}</span>
    </CollagePiece>
  );
}
