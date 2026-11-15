import { cacheLife } from "next/cache";

import { customersMock } from "./customers.mock";
import type { GetCustomersResponse } from "./customers.types";

/** 모든 고객(가입 최신순). 검색·필터·정렬·페이지는 client에서 한다. 목업이다. */
export async function getCustomers(): Promise<GetCustomersResponse> {
  "use cache";
  cacheLife("minutes");

  return { items: customersMock };
}
