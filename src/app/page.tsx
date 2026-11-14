import { PageBodyPlaceholder } from "@/components/PageBodyPlaceholder";
import { PageHeader } from "@/components/PageHeader";

export default function Page() {
  return (
    <>
      <PageHeader
        title="개요"
        description="핵심 지표와 최근 활동을 한눈에 봅니다."
        breadcrumbs={[{ label: "개요" }]}
      />
      <PageBodyPlaceholder ticket="04" />
    </>
  );
}
