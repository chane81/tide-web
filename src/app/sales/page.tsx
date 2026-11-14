import { Button } from "@tide-design/components";
import { CalendarIcon } from "@tide-design/icons";
import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";

import { getSalesReport } from "./_src/apis/sales.api";
import { ExportReportButton } from "./_src/components/ExportReportButton";
import { MonthlyOrders } from "./_src/components/MonthlyOrders";
import { RecentPurchases } from "./_src/components/RecentPurchases";
import { SalesKpis } from "./_src/components/SalesKpis";
import { SalesReport } from "./_src/components/SalesReport";

export const metadata: Metadata = { title: "매출" };

export default async function Page() {
  const report = await getSalesReport();

  return (
    <>
      <PageHeader
        title="매출"
        description="오늘 매출과 기간별 매출 추이를 봅니다."
        breadcrumbs={[{ label: "개요", href: "/" }, { label: "매출" }]}
        actions={
          <>
            {/* tide에 DatePicker가 없어 모양만 둔다(docs/tide-gaps.md). */}
            <Button variant="outline" color="neutral" startIcon={<CalendarIcon />} disabled>
              최근 12개월
            </Button>
            <ExportReportButton />
          </>
        }
      />
      <div className="flex flex-col gap-6">
        <SalesKpis />
        <SalesReport report={report} />
        <div className="grid gap-6 xl:grid-cols-2">
          <MonthlyOrders />
          <RecentPurchases />
        </div>
      </div>
    </>
  );
}
