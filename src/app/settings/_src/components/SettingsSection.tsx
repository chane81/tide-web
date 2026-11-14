import { Card, Typography } from "@tide-design/components";
import type { ReactNode } from "react";

export interface SettingsSectionProps {
  /** 제목 요소 id. 섹션의 이름이 된다. */
  titleId: string;
  title: string;
  description: string;
  children: ReactNode;
}

/**
 * 설정 한 묶음: 제목·설명과 내용. 넓은 화면에서는 제목을 왼쪽 열에 두고 입력은 오른쪽에 둔다.
 * 입력 폭이 좁아 한 열로 두면 카드 오른쪽이 비기 때문이다.
 */
export function SettingsSection({ titleId, title, description, children }: SettingsSectionProps) {
  return (
    <Card
      render={<section aria-labelledby={titleId} />}
      className="grid gap-6 p-6 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-10"
    >
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
