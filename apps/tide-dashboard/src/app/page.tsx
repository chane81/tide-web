import { getOverviewMetrics } from "@/apis/overview.api";
import { OverviewMetrics } from "@/components/OverviewMetrics";
import { PageHeader } from "@/components/PageHeader";
import { QuickActions } from "@/components/QuickActions";
import { TopMembers } from "@/components/TopMembers";

export default async function Page() {
  const metrics = await getOverviewMetrics();

  return (
    <>
      <PageHeader title="개요" description="핵심 지표와 최근 활동을 한눈에 봅니다." />
      <div className="flex flex-col gap-8">
        <OverviewMetrics metrics={metrics} />
        <div className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <QuickActions />
          <TopMembers />
        </div>
      </div>
    </>
  );
}
