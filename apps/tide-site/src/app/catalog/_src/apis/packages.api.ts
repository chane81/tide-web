import { cacheLife } from "next/cache";

import { packagesMock } from "./packages.mock";
import type { GetPackagesResponse } from "./packages.types";

/**
 * tide 패키지 목록을 읽는다(목업). 렌더 정책: 배포 때만 바뀌는 사실이라 하루 캐시해 프리렌더 셸에 넣는다.
 */
export async function getPackages(): Promise<GetPackagesResponse> {
  "use cache";
  cacheLife("days");

  return { packages: packagesMock };
}
