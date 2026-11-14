import { useState } from "react";

import { toasts } from "@/libs/toasts";

/** 목업 저장에 걸리는 시간(ms) */
export const MOCK_SAVE_DELAY = 600;

/**
 * 목업 저장. 잠깐 `saving`이었다가 `onSaved`를 부르고 저장 완료 Toast를 띄운다.
 * 실제 API로 바꾸면 기다리는 부분만 요청으로 바뀐다.
 */
export function useMockSave<T>(onSaved: (values: T) => void, title = "설정을 저장했습니다") {
  const [saving, setSaving] = useState(false);

  async function save(values: T) {
    setSaving(true);
    await new Promise((resolve) => setTimeout(resolve, MOCK_SAVE_DELAY));
    setSaving(false);
    onSaved(values);
    toasts.add({ title, color: "success" });
  }

  return { saving, save };
}
