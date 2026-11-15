import type { ReactNode } from "react";

export interface SceneCardProps {
  /** 카드의 큰 제목: tide에 대한 사실 한 문장 */
  title: ReactNode;
  /** 오른쪽 아래 굵은 라벨: 출처(패키지 이름, 문서 항목) */
  source: string;
  /** 라벨 아래 보조 한 줄 */
  note: string;
  /** 제목 아래 실제 tide 화면 조각(선택) */
  children?: ReactNode;
  /** 제목 요소. 구역 안 카드는 h3, 히어로 안 카드는 제목이 아니라 문단(p): 히어로의 제목은 h1 하나다. */
  as?: "h3" | "p";
}

/**
 * 빛 바탕 위에 뜨는 흰 카드. 사람 이름·후기 대신 출처 라벨(패키지 이름·문서 항목)을 적는다.
 * `data-ui`: 키트·검사기가 읽는 「제품 UI 조각」 표시(값이 비어 키트가 자기 조각을 그려 넣지 않는다).
 */
export function SceneCard({ title, source, note, children, as: Heading = "h3" }: SceneCardProps) {
  return (
    <article className="scene-card" data-ui="">
      <Heading className="scene-card__title">{title}</Heading>
      {children ? <div className="scene-card__ui">{children}</div> : null}
      <p className="scene-card__foot">
        <strong className="scene-card__source">{source}</strong>
        <span className="scene-card__note">{note}</span>
      </p>
    </article>
  );
}
