import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";

import { getCustomers } from "./_src/apis/customers.api";
import { CustomerSummary } from "./_src/components/CustomerSummary";
import { CustomerTable } from "./_src/components/CustomerTable";

export const metadata: Metadata = { title: "고객 목록" };

export default async function Page() {
  const { items } = await getCustomers();

  return (
    <>
      <PageHeader
        title="고객 목록"
        description="고객을 검색하고 상태별로 관리합니다."
        breadcrumbs={[{ label: "고객" }, { label: "고객 목록" }]}
      />
      <div className="flex flex-col gap-6">
        <CustomerSummary customers={items} />
        <CustomerTable customers={items} />
      </div>
    </>
  );
}
