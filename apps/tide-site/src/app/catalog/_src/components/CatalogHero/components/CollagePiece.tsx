import { Card } from "@tide-design/components";
import type { CSSProperties, ReactNode } from "react";

export interface CollagePieceProps {
  /** 콜라주 안 왼쪽·위 위치와 너비(콜라주 크기의 %), 높이(선택) */
  x: string;
  y: string;
  w: string;
  h?: string;
  /** 안의 tide Component가 자기 테두리를 그리면(Alert 등) Card로 감싸지 않는다. */
  bare?: boolean;
  children: ReactNode;
}

/**
 * 콜라주 조각 하나. 키트 `.ly-piece`는 자리만 맡고(키트 반경·바탕·그림자·잘라냄은 globals.css에서 끈다),
 * 모양은 tide Card(또는 Alert) 본래 테두리 그대로에 부드러운 그림자 하나를 더한다. 세 조각이 같은 규칙을 쓴다.
 */
export function CollagePiece({ x, y, w, h, bare = false, children }: CollagePieceProps) {
  const style = { "--x": x, "--y": y, "--w": w, ...(h ? { "--ph": h } : {}) } as CSSProperties;

  return (
    <div className="ly-piece cat-piece" style={style}>
      {bare ? children : <Card className="flex h-full flex-col gap-3">{children}</Card>}
    </div>
  );
}
