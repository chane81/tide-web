import { Button, TableCell, TableRow } from "@tide-design/components";
import { SearchXIcon } from "@tide-design/icons";

export interface CustomerEmptyStateProps {
  /** 표 열 수(칸을 가로질러 펼친다) */
  colSpan: number;
  onReset: () => void;
}

/** 검색·필터 결과가 없을 때 표 안에 보이는 안내. tide에 EmptyState가 없어 조립했다. */
export function CustomerEmptyState({ colSpan, onReset }: CustomerEmptyStateProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan}>
        <div className="flex flex-col items-center gap-3 py-10 text-center">
          <SearchXIcon className="size-6 text-muted" />
          <div className="flex flex-col gap-1">
            <span className="text-label-md">조건에 맞는 고객이 없습니다</span>
            <p className="text-body-sm text-muted">검색어를 바꾸거나 상태 필터를 풀어 보세요.</p>
          </div>
          <Button variant="outline" color="neutral" size="sm" onClick={onReset}>
            검색 초기화
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}
