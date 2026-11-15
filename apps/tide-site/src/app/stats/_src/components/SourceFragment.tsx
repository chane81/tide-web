import { Badge } from "@tide-design/components";

export interface SourceFragmentProps {
  /** 요청 줄(메서드와 경로) */
  request: string;
  /** 응답에서 읽는 필드 */
  field: string;
}

/** 출처 카드의 그림: 읽는 요청 한 줄과 응답에서 쓰는 필드를 tide Badge로. 키트 카드 패널 안에 놓인다. */
export function SourceFragment({ request, field }: SourceFragmentProps) {
  return (
    <div className="stats-fragment" data-ui="" aria-hidden="true">
      <code className="font-mono text-body-sm">{request}</code>
      <Badge color="primary" variant="subtle">
        {field}
      </Badge>
    </div>
  );
}
