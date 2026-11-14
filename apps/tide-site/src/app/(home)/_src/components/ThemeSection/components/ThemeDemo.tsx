import { Badge, Button, Card, Input, Field, Typography } from "@tide-design/components";
import { ThemeToggle } from "@tide-web/components";

import { DEFAULT_THEME, THEME_STORAGE_KEY } from "@/constants/theme";

const ROLES = ["neutral", "primary", "success", "warning", "danger", "info"] as const;

/**
 * 테마 견본: 스위치를 누르면 이 페이지 전체의 `<html data-theme>`이 바뀐다.
 * `data-ui`: 키트와 검사기가 읽는 「제품 UI 조각」 표시. 값이 비어 있어 키트가 자기 조각을 그려 넣지 않는다.
 */
export function ThemeDemo() {
  return (
    <div className="theme-demo" data-ui="">
      <ThemeToggle
        storageKey={THEME_STORAGE_KEY}
        defaultTheme={DEFAULT_THEME}
        label="이 페이지를 어둡게"
      />
      <Card className="flex flex-col gap-4">
        <Typography variant="heading-xs" level={3}>
          알림 설정
        </Typography>
        <Field label="받을 메일 주소">
          <Input defaultValue="haneul.kim@example.com" />
        </Field>
        <div className="flex flex-wrap gap-2">
          {ROLES.map((role) => (
            <Badge key={role} color={role}>
              {role}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2">
          <Button>저장</Button>
          <Button variant="outline" color="neutral">
            취소
          </Button>
        </div>
      </Card>
    </div>
  );
}
