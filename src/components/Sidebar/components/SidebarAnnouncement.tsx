"use client";

import { Card, IconButton, Typography } from "@tide-design/components";
import { SparklesIcon, XIcon } from "@tide-design/icons";
import { useState } from "react";

/** 새 기능 안내 카드. 닫으면 이번 방문 동안 숨긴다(저장하지 않는다). */
export function SidebarAnnouncement() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <Card
      render={<section aria-labelledby="sidebar-announcement-title" />}
      className="relative p-4"
    >
      <IconButton
        aria-label="공지 닫기"
        variant="ghost"
        color="neutral"
        size="xs"
        className="absolute top-2 right-2"
        onClick={() => setOpen(false)}
      >
        <XIcon />
      </IconButton>
      <SparklesIcon className="mb-2 text-primary" />
      <Typography variant="label-md" id="sidebar-announcement-title">
        새 기능: 고객 일괄 내보내기
      </Typography>
      <Typography variant="body-sm" className="mt-1 text-muted">
        고객 화면에서 여러 명을 골라 한 번에 내보낼 수 있습니다.
      </Typography>
    </Card>
  );
}
