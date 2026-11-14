import { Card, Typography } from "@tide-design/components";
import type { ReactNode } from "react";

export interface SettingsSectionProps {
  /** 제목 요소 id. 섹션의 이름이 된다. */
  titleId: string;
  title: string;
  description: string;
  children: ReactNode;
}

/** 설정 한 묶음: 제목·설명과 내용 */
export function SettingsSection({ titleId, title, description, children }: SettingsSectionProps) {
  return (
    <Card render={<section aria-labelledby={titleId} />} className="flex flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <Typography variant="heading-sm" level={2} id={titleId}>
          {title}
        </Typography>
        <Typography variant="body-sm" className="text-muted">
          {description}
        </Typography>
      </div>
      {children}
    </Card>
  );
}
