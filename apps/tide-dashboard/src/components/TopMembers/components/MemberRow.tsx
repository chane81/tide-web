import { Avatar, Badge } from "@tide-design/components";

import type { Member } from "@/apis/members.types";
import { formatDate } from "@/libs/formatDate";

export interface MemberRowProps {
  member: Member;
}

/** 회원 한 줄: 아바타, 이름·이메일, 가입일, 온라인 상태 */
export function MemberRow({ member }: MemberRowProps) {
  return (
    <li className="flex items-center gap-3 py-3">
      <Avatar src={member.avatarUrl} alt="" size="sm" color="blue" />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-label-md">{member.name}</span>
        <span className="truncate text-caption text-muted">{member.email}</span>
      </div>
      {/* xl~2xl에서는 오른쪽 좁은 열에 놓여 이메일이 너무 잘리므로 가입일을 숨긴다. */}
      <span className="hidden text-body-sm text-muted sm:inline xl:hidden 2xl:inline">
        <span className="sr-only">가입일 </span>
        <time dateTime={member.joinedAt}>{formatDate(member.joinedAt)}</time>
      </span>
      <Badge size="sm" variant="faint" color={member.online ? "success" : "neutral"}>
        {member.online ? "온라인" : "오프라인"}
      </Badge>
    </li>
  );
}
