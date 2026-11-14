import type { Metadata } from "next";

import { PageBodyPlaceholder } from "@/components/PageBodyPlaceholder";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "카드" };

export default function Page() {
  return (
    <>
      <PageHeader
        title="카드"
        description="내 카드와 거래 내역을 봅니다."
        breadcrumbs={[{ label: "개요", href: "/" }, { label: "카드" }]}
      />
      <PageBodyPlaceholder ticket="06" />
    </>
  );
}
