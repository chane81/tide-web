import type { Metadata } from "next";

import { PageBodyPlaceholder } from "@/components/PageBodyPlaceholder";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = { title: "설정" };

export default function Page() {
  return (
    <>
      <PageHeader
        title="설정"
        description="프로필, 알림, 보안 설정을 바꿉니다."
        breadcrumbs={[{ label: "개요", href: "/" }, { label: "설정" }]}
      />
      <PageBodyPlaceholder ticket="08" />
    </>
  );
}
