import { Badge, Progress } from "@tide-design/components";

/** components 카드 그림: 실제 tide Badge·Progress 조각 */
export function ComponentsVisual() {
  return (
    <div className="flex w-full flex-col gap-4">
      <span className="flex flex-wrap gap-2">
        <Badge color="primary">primary</Badge>
        <Badge color="success">success</Badge>
        <Badge color="warning">warning</Badge>
        <Badge color="danger">danger</Badge>
      </span>
      <Progress value={64} aria-label="견본 진행률" />
    </div>
  );
}
