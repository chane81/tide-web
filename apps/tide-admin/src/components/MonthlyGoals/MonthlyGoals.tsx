import { Card, Typography } from "@tide-design/components";

import { getGoals } from "@/apis/goals.api";
import { formatDate } from "@/libs/formatDate";

import { GoalItem } from "./components/GoalItem";

/** 「이번 달 목표」: 목표마다 현재 값과 달성률을 진행 막대로 보인다. 데이터를 직접 읽는 async 서버 컴포넌트다. */
export async function MonthlyGoals() {
  const { month, items } = await getGoals();

  return (
    // 「시작하기」·「상위 회원」과 같이 제목을 카드 밖에 둔다.
    <section aria-labelledby="monthly-goals-title" className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <Typography variant="heading-sm" level={2} id="monthly-goals-title">
          이번 달 목표
        </Typography>
        <Typography variant="body-sm" className="text-muted">
          <time dateTime={month}>{formatDate(month)}</time>부터
        </Typography>
      </div>
      <Card render={<ul />} className="grid gap-6 p-5 shadow-sm sm:grid-cols-3">
        {items.map((goal) => (
          <GoalItem key={goal.id} goal={goal} />
        ))}
      </Card>
    </section>
  );
}
