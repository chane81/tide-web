import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@tide-design/components";

import { getPageRange } from "../libs/getPageRange";

export interface TransactionPaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}

/** 거래 표 페이지 이동. 주소가 아니라 상태로 바꾸므로 번호는 버튼으로 그린다. */
export function TransactionPagination({
  page,
  pageCount,
  onPageChange,
}: TransactionPaginationProps) {
  return (
    <Pagination aria-label="거래 내역 페이지">
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
