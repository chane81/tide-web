import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@tide-design/components";

import { getPageRange } from "@/libs/getPageRange";

export interface PageNavigationProps {
  /** 현재 페이지(1부터) */
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  /** 탐색 영역 이름. 한 화면에 여럿이면 구분한다. 예: `"거래 내역 페이지"` */
  "aria-label": string;
}

/**
 * 상태로 페이지를 바꾸는 tide Pagination. 주소가 아니라 상태로 바꾸므로 번호는 버튼으로 그린다.
 * 보일 번호 범위는 `getPageRange`가 정한다.
 */
export function PageNavigation({
  page,
  pageCount,
  onPageChange,
  "aria-label": ariaLabel,
}: PageNavigationProps) {
  return (
    <Pagination aria-label={ariaLabel}>
      <PaginationItem>
        <PaginationPrevious disabled={page <= 1} onClick={() => onPageChange(page - 1)} />
      </PaginationItem>
      {getPageRange(page, pageCount).map((item, i) => (
        // 생략 자리는 앞·뒤 두 곳에 올 수 있어 위치로 key를 만든다.
        <PaginationItem key={item === "ellipsis" ? `ellipsis-${i}` : item}>
          {item === "ellipsis" ? (
            <PaginationEllipsis />
          ) : (
            <PaginationLink
              current={item === page}
              render={
                <button
                  type="button"
                  aria-label={`${item}페이지`}
                  onClick={() => onPageChange(item)}
                />
              }
            >
              {item}
            </PaginationLink>
          )}
        </PaginationItem>
      ))}
      <PaginationItem>
        <PaginationNext disabled={page >= pageCount} onClick={() => onPageChange(page + 1)} />
      </PaginationItem>
    </Pagination>
  );
}
