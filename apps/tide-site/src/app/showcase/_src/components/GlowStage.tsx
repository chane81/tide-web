import type { ReactNode } from "react";

import { GlowDecor } from "./GlowDecor";

export interface GlowStageProps {
  /** 판 위에 뜨는 카드 */
  children: ReactNode;
}

/** 흰 판(옅은 테두리, 큰 반경) 안에 빛 번짐 장식을 깔고 카드 하나를 가운데 띄운다. */
export function GlowStage({ children }: GlowStageProps) {
  return (
    <div className="glow-stage">
      <GlowDecor />
      {children}
    </div>
  );
}
