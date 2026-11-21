import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";

import { getCustomers } from "../_src/apis/customers.api";
import { SegmentTable } from "./_src/components/SegmentTable";
import { summarizeSegments } from "./_src/libs/summarizeSegments";

export const metadata: Metadata = { title: "세그먼트" };

export default async function Page() {
  const { items } = await getCustomers();

  return (
    <>
      <PageHeader
        title="세그먼트"
        description="고객을 활동과 결제 규모로 나눠 봅니다."
        breadcrumbs={[{ label: "고객" }, { label: "세그먼트" }]}
      />
      <SegmentTable segments={summarizeSegments(items)} />
    </>
  );
}
