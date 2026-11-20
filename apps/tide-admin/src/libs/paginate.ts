export interface PaginateResult<T> {
  /** 이 페이지의 항목 */
  items: T[];
  /** 실제로 보인 페이지(1부터). 범위를 벗어난 값은 첫·끝 페이지로 맞춘다. */
  page: number;
  /** 전체 페이지 수. 항목이 없어도 1이다. */
  pageCount: number;
  /** 전체 항목 수 */
  total: number;
}

/** 목록을 `pageSize`개씩 나눠 `page`번째 페이지를 준다. */
export function paginate<T>(
  items: readonly T[],
  page: number,
  pageSize: number,
): PaginateResult<T> {
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const current = Math.min(Math.max(1, Math.trunc(page)), pageCount);
  const start = (current - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    page: current,
    pageCount,
    total: items.length,
  };
}
