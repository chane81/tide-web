"use client";

import { Alert } from "@tide-design/components";
import { useState } from "react";

/** 새 기능 안내. 닫으면 이번 방문 동안 숨긴다(저장하지 않는다). */
export function SidebarAnnouncement() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <Alert
      color="info"
      title="새 기능: 고객 일괄 내보내기"
      closeLabel="공지 닫기"
      onClose={() => setOpen(false)}
    >
      고객 화면에서 여러 명을 골라 한 번에 내보낼 수 있습니다.
    </Alert>
  );
}
