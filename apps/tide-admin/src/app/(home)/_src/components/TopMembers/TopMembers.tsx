import { Card } from "@tide-design/components";

import { getTopMembers } from "../../apis/members/members.api";
import { MemberRow } from "./components/MemberRow";

/** 상위 회원 목록. 데이터를 직접 읽는 async 서버 컴포넌트다. */
export async function TopMembers() {
  const { items } = await getTopMembers();

  return (
    // 옆 「시작하기」와 같이 제목을 카드 밖에 두어 두 열의 머리 줄을 맞춘다.
    <section aria-labelledby="top-members-title" className="flex flex-col gap-3">
      <h2 className="text-heading-sm" id="top-members-title">
        상위 회원
      </h2>
      {/* flex-1: 왼쪽 열(시작하기 + 이번 달 목표)과 카드 아래 끝을 맞춘다. */}
      <Card render={<ul />} className="flex-1 divide-y divide-default px-5 py-1 shadow-sm">
        {items.map((member) => (
          <MemberRow key={member.id} member={member} />
        ))}
      </Card>
    </section>
  );
}
