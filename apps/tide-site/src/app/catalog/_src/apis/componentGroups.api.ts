import { cacheLife } from "next/cache";

import { componentGroupsMock } from "./componentGroups.mock";
import type { GetComponentGroupsResponse } from "./componentGroups.types";

/**
 * Component 묶음을 읽는다(목업). 렌더 정책: 배포 때만 바뀌는 사실이라 하루 캐시해 프리렌더 셸에 넣는다.
 */
export async function getComponentGroups(): Promise<GetComponentGroupsResponse> {
  "use cache";
  cacheLife("days");

  return { groups: componentGroupsMock };
}
