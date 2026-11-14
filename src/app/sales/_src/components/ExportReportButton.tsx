"use client";

import { Button } from "@tide-design/components";
import { DownloadIcon } from "@tide-design/icons";
import { useState } from "react";

import { toasts } from "@/libs/toasts";

/** 목업 내보내기에 걸리는 시간(ms) */
const EXPORT_DELAY = 600;

/** 「보고서 내보내기」. 잠깐 로딩을 보인 뒤 완료 Toast를 띄운다(목업). */
export function ExportReportButton() {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, EXPORT_DELAY));
    setLoading(false);
    toasts.add({
      title: "보고서를 내보냈습니다",
      description: "sales-report.csv",
      color: "success",
    });
  }

  return (
    <Button startIcon={<DownloadIcon />} loading={loading} onClick={handleClick}>
      보고서 내보내기
    </Button>
  );
}
