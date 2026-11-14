"use client";

import { ToastRegion } from "@tide-design/components";

import { toasts } from "@/libs/toasts";

/** 셸에 하나 두는 Toast 영역 */
export function AppToastRegion() {
  return <ToastRegion queue={toasts} aria-label="알림" />;
}
