import type { Metadata } from "next";

import { PageBodyPlaceholder } from "@/components/PageBodyPlaceholder";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "매출" };

export default function Page() {
  return (
    <>
      <PageHeader
        title="매출"
        description="오늘 매출과 기간별 매출 추이를 봅니다."
        breadcrumbs={[{ label: "개요", href: "/" }, { label: "매출" }]}
      />
      <PageBodyPlaceholder ticket="05" />
    </>
  );
}
