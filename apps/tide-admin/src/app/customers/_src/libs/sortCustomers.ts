import type { Customer } from "../apis/customers/customers.types";

/** 정렬할 수 있는 열 */
export type CustomerSortKey = "name" | "joinedAt" | "totalSpent";

export type SortDirection = "asc" | "desc";

export interface CustomerSort {
  key: CustomerSortKey;
  direction: SortDirection;
}

const collator = new Intl.Collator("ko-KR");

function compare(a: Customer, b: Customer, key: CustomerSortKey): number {
  if (key === "name") return collator.compare(a.name, b.name);
  if (key === "totalSpent") return a.totalSpent - b.totalSpent;
  return a.joinedAt.localeCompare(b.joinedAt);
}

/** 고객을 정렬한 새 배열. 값이 같으면 원래 순서를 지킨다. */
export function sortCustomers(items: readonly Customer[], sort: CustomerSort): Customer[] {
  const sign = sort.direction === "asc" ? 1 : -1;

  return items.toSorted((a, b) => sign * compare(a, b, sort.key));
}
