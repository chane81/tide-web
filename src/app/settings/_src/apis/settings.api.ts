import { settingsMock } from "./settings.mock";
import type { GetSettingsResponse } from "./settings.types";

/** 설정 화면 초기값. 목업이라 요청마다 바뀌지 않으므로 캐시해 프리렌더한다. */
export async function getSettings(): Promise<GetSettingsResponse> {
  "use cache";

  return settingsMock;
}
