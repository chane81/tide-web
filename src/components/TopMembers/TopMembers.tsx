import { Card, Typography } from "@tide-design/components";

import { getTopMembers } from "@/apis/members.api";

import { MemberRow } from "./components/MemberRow";

/** 상위 회원 목록. 데이터를 직접 읽는 async 서버 컴포넌트다. */
export async function TopMembers() {
  const { items } = await getTopMembers();

  return (
    // 옆 「시작하기」와 같이 제목을 카드 밖에 두어 두 열의 머리 줄을 맞춘다.
    <section aria-labelledby="top-members-title" className="flex flex-col gap-3">
      <Typography variant="heading-sm" level={2} id="top-members-title">
        상위 회원
      </Typography>
      <Card render={<ul />} className="divide-y divide-default px-5 py-1">
        {items.map((member) => (
          <MemberRow key={member.id} member={member} />
        ))}
      </Card>
    </section>
  );
}
