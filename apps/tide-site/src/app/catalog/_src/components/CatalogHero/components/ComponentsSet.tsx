import { Alert, Badge, Progress, Typography } from "@tide-design/components";

import { CollagePiece } from "./CollagePiece";
import { CountPiece } from "./CountPiece";

/** 콜라주 첫 벌: @tide-design/components 조각. 마지막 조각이 96%·96%에서 끝나 키트 멈춤 단추가 그 모서리에 앉는다. */
export function ComponentsSet() {
  return (
    <div className="ly-collage__set is-on">
      <CollagePiece x="4%" y="6%" w="52%">
        <Typography variant="heading-xs" render={<span />}>
          배포 준비
        </Typography>
        <Progress value={72} aria-label="배포 준비" />
        <span className="flex flex-wrap gap-2">
          <Badge color="success">통과</Badge>
          <Badge color="warning">검토</Badge>
          <Badge color="neutral">초안</Badge>
        </span>
      </CollagePiece>
      <CollagePiece x="60%" y="10%" w="36%" bare>
        <Alert color="info" title="저장했습니다">
          초안 세 개가 남았습니다.
        </Alert>
      </CollagePiece>
      <CountPiece count="35종" label="React Component" />
      <CollagePiece x="36%" y="70%" w="60%" h="26%">
        <span className="font-mono text-body-sm">
          {'import { Card } from "@tide-design/components";'}
        </span>
      </CollagePiece>
    </div>
  );
}
