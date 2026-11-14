import { cacheLife } from "next/cache";

import type { GetTidePackageResponse } from "./tidePackage.types";

const PACKAGE_NAME = "@tide-design/components";

/**
 * npm registry에서 tide 최신 버전을 읽는다. 목업이 아닌 실제 `fetch` 예시다.
 * 결과는 몇 시간 캐시해 셸 프리렌더에 넣고, 실패하면 `null`을 돌려 화면을 깨지 않는다.
 */
export async function getTidePackage(): Promise<GetTidePackageResponse | null> {
  "use cache";
  cacheLife("hours");

  try {
    const res = await fetch(`https://registry.npmjs.org/${PACKAGE_NAME}/latest`);
    if (!res.ok) return null;

    const data = (await res.json()) as { version?: unknown };
    if (typeof data.version !== "string") return null;

    return { name: PACKAGE_NAME, version: data.version };
  } catch {
    return null;
  }
}
