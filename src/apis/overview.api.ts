import { cacheLife } from "next/cache";

import { overviewMetricsMock } from "./overview.mock";
import type { GetOverviewMetricsResponse } from "./overview.types";

/** 개요 지표를 기간별로 모두 읽는다(목업). 기간 탭은 client에서 바꾼다. */
export async function getOverviewMetrics(): Promise<GetOverviewMetricsResponse> {
  "use cache";
  cacheLife("hours");

  return overviewMetricsMock;
}
