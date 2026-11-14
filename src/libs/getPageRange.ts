/** Pagination에 보일 칸: 페이지 번호 또는 생략 자리 */
export type PageRangeItem = number | "ellipsis";

/**
 * Pagination에 보일 번호 목록. 첫·끝 페이지와 현재 페이지 앞뒤 `siblings`개를 보이고, 사이는 생략한다.
 * 생략 자리가 번호 하나만 가리게 되면 생략하지 않고 그 번호를 보인다.
 */
export function getPageRange(page: number, pageCount: number, siblings = 1): PageRangeItem[] {
  const start = Math.max(2, page - siblings);
  const end = Math.min(pageCount - 1, page + siblings);
  const range: PageRangeItem[] = [1];

  if (start === 3) range.push(2);
  else if (start > 3) range.push("ellipsis");

  for (let p = start; p <= end; p++) range.push(p);

  if (end === pageCount - 2) range.push(pageCount - 1);
  else if (end < pageCount - 2) range.push("ellipsis");

  if (pageCount > 1) range.push(pageCount);

  return range;
}
