import { cacheLife } from "next/cache";

import { topMembersMock } from "./members.mock";
import type { GetTopMembersResponse } from "./members.types";

/** 상위 회원 목록을 읽는다(목업). */
export async function getTopMembers(): Promise<GetTopMembersResponse> {
  "use cache";
  cacheLife("hours");

  return { items: topMembersMock };
}
