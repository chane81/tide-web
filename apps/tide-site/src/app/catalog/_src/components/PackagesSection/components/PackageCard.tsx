import { Badge, Card } from "@tide-design/components";
import type { ReactElement } from "react";

import type { TidePackage } from "../../../apis/packages/packages.types";
import { ComponentsVisual } from "./ComponentsVisual";
import { IconsVisual } from "./IconsVisual";
import { TokensVisual } from "./TokensVisual";

/** 패키지마다 카드 위쪽 그림. 실제 tide 조각이다. */
const VISUALS: Record<string, () => ReactElement> = {
  components: ComponentsVisual,
  icons: IconsVisual,
  foundation: TokensVisual,
};

const npmUrl = (name: string) => `https://www.npmjs.com/package/${name}`;

export interface PackageCardProps {
  pkg: TidePackage;
}

/**
 * 패키지 하나를 tide Card로. 위쪽 판(옅은 primary·info 빛 바탕)에 그 패키지의 실제 조각을 올린다.
 * `data-ui`: 키트·검사기가 읽는 「제품 UI 조각」 표시(값이 비어 키트가 자기 조각을 그려 넣지 않는다).
 */
export function PackageCard({ pkg }: PackageCardProps) {
  const Visual = VISUALS[pkg.id];

  return (
    <Card className="span-4 flex flex-col gap-4 cat-package">
      {Visual ? (
        <div className="cat-panel" data-ui="" aria-hidden="true">
          <Visual />
        </div>
      ) : null}
      <span className="flex items-center justify-between gap-3">
        <h3 className="text-heading-sm">{pkg.id}</h3>
        <Badge color="neutral" variant="faint">
          MIT
        </Badge>
      </span>
      <p className="text-body-md">{pkg.summary}</p>
      <code className="cat-install font-mono text-body-sm">{pkg.install ?? pkg.note}</code>
      <a className="link" href={npmUrl(pkg.name)}>
        npm에서 {pkg.id} 보기
      </a>
    </Card>
  );
}
