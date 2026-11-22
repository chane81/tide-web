import { cacheLife } from "next/cache";

import { goalsMock } from "./goals.mock";
import type { GetGoalsResponse } from "./goals.types";

/** 이번 달 목표를 읽는다(목업). */
export async function getGoals(): Promise<GetGoalsResponse> {
  "use cache";
  cacheLife("hours");

  return goalsMock;
}
