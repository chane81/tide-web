import { Button, Card, Typography } from "@tide-design/components";
import { ArrowRightIcon, FileChartLineIcon, UserPlusIcon } from "@tide-design/icons";
import NextLink from "next/link";
import type { ReactNode } from "react";

interface QuickAction {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  cta: string;
}

const ACTIONS: QuickAction[] = [
  {
    icon: <UserPlusIcon size={20} />,
    title: "첫 고객 추가",
    description: "고객을 등록하면 결제와 활동이 개요에 모입니다.",
    href: "/customers",
    cta: "고객으로 가기",
  },
  {
    icon: <FileChartLineIcon size={20} />,
    title: "보고서 만들기",
    description: "기간별 매출을 비교하고 보고서로 내보냅니다.",
    href: "/sales",
    cta: "매출로 가기",
  },
];

/** 「시작하기」 바로가기 카드 두 장 */
export function QuickActions() {
  return (
    <section aria-labelledby="quick-actions-title" className="flex flex-col gap-3">
      <Typography variant="heading-sm" level={2} id="quick-actions-title">
        시작하기
      </Typography>
      <ul className="grid gap-4 sm:grid-cols-2">
        {ACTIONS.map((action) => (
          <Card
            key={action.href}
            render={<li />}
            className="flex flex-col items-start gap-3 p-5 shadow-sm transition-shadow hover:shadow-md"
          >
            <span className="flex size-10 items-center justify-center rounded-md bg-primary-subtle text-primary">
              {action.icon}
            </span>
            <div className="flex flex-col gap-1">
              <Typography variant="heading-xs" level={3}>
                {action.title}
              </Typography>
              <Typography variant="body-sm" className="text-muted">
                {action.description}
              </Typography>
            </div>
            <Button
              variant="outline"
              color="neutral"
              size="sm"
              endIcon={<ArrowRightIcon />}
              render={<NextLink href={action.href} />}
            >
              {action.cta}
            </Button>
          </Card>
        ))}
      </ul>
    </section>
  );
}
