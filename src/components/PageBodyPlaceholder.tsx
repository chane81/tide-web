import { Card, Typography } from "@tide-design/components";

export interface PageBodyPlaceholderProps {
  /** 이 자리를 채울 티켓 */
  ticket: string;
}

/** 아직 만들지 않은 화면 본문 자리 */
export function PageBodyPlaceholder({ ticket }: PageBodyPlaceholderProps) {
  return (
    <Card className="flex min-h-64 items-center justify-center border-dashed p-6">
      <Typography variant="body-sm" className="text-muted">
        본문은 티켓 {ticket}에서 채웁니다.
      </Typography>
    </Card>
  );
}
