import { Card, type Color } from "@tide-design/components";
import type { ReactNode } from "react";

export interface CustomerSummaryCardProps {
  label: string;
  value: string;
  /** 값 아래 보조 설명(「전체의 62%」 등) */
  hint: string;
  /** `@tide-design/icons` 아이콘 */
  icon: ReactNode;
  /** 아이콘 바탕 색. `data-color` + accent 토큰이라 테마를 따라간다. */
  color: Color;
}

/** 고객 요약 지표 한 칸: 아이콘, 이름, 값, 보조 설명 */
export function CustomerSummaryCard({ label, value, hint, icon, color }: CustomerSummaryCardProps) {
  return (
    <Card className="flex items-start gap-4 p-5 shadow-sm">
      <span
        data-color={color}
        aria-hidden
        className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-subtle text-accent-on-subtle"
      >
        {icon}
      </span>
      <div className="flex min-w-0 flex-col gap-1">
        <span className="text-label-md text-muted">{label}</span>
        <p className="text-heading-md tabular-nums">{value}</p>
        <p className="text-body-sm text-muted">{hint}</p>
      </div>
    </Card>
  );
}
