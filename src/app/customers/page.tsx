import type { Metadata } from "next";

import { PageBodyPlaceholder } from "@/components/PageBodyPlaceholder";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "고객" };

export default function Page() {
  return (
    <>
      <PageHeader
        title="고객"
        description="고객을 검색하고 상태별로 관리합니다."
        breadcrumbs={[{ label: "개요", href: "/" }, { label: "고객" }]}
      />
      <PageBodyPlaceholder ticket="07" />
    </>
  );
}
