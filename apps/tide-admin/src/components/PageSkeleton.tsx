import { Card, Skeleton } from "@tide-design/components";

/** 라우트를 불러오는 동안 보이는 자리: 헤더 + 카드 모양 */
export function PageSkeleton() {
  return (
    <div aria-busy="true" aria-live="polite" className="flex flex-col gap-6">
      <span className="sr-only">불러오는 중</span>
      <div className="flex flex-col gap-3">
        <Skeleton className="w-32" />
        <Skeleton variant="rect" className="h-9 w-48" />
        <Skeleton className="w-72" />
      </div>
      <Skeleton variant="rect" className="h-9 w-80" />
      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <Card className="flex flex-col gap-4 p-6">
          <Skeleton className="w-16" />
          <Skeleton variant="rect" className="h-10 w-56" />
          <Skeleton variant="rect" className="h-64" />
        </Card>
        <div className="grid gap-4 sm:grid-cols-3 xl:grid-cols-1">
          {[0, 1, 2].map((i) => (
            <Card key={i} className="flex flex-col gap-3 p-5">
              <Skeleton className="w-20" />
              <Skeleton variant="rect" className="h-7 w-28" />
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
