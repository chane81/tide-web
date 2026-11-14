import { Card, Typography } from "@tide-design/components";

import { getTopMembers } from "@/apis/members.api";

import { MemberRow } from "./components/MemberRow";

/** 상위 회원 목록. 데이터를 직접 읽는 async 서버 컴포넌트다. */
export async function TopMembers() {
  const { items } = await getTopMembers();

  return (
    <Card render={<section aria-labelledby="top-members-title" />} className="flex flex-col p-5">
      <Typography variant="heading-sm" level={2} id="top-members-title">
        상위 회원
      </Typography>
      <ul className="divide-y divide-default">
        {items.map((member) => (
          <MemberRow key={member.id} member={member} />
        ))}
      </ul>
    </Card>
  );
}
