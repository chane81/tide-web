import { currentUserMock } from "./currentUser.mock";
import type { GetCurrentUserResponse } from "./currentUser.types";

/** 로그인한 사용자를 읽는다. 목업이라 요청마다 바뀌지 않으므로 캐시해 셸을 프리렌더한다. */
export async function getCurrentUser(): Promise<GetCurrentUserResponse> {
  "use cache";

  return currentUserMock;
}
