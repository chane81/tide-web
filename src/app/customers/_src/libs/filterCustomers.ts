import type { Customer, CustomerStatus } from "../apis/customers.types";

/** 상태 필터. `all`은 거르지 않는다. */
export type CustomerStatusFilter = CustomerStatus | "all";

export interface CustomerFilter {
  /** 이름·이메일 검색어. 앞뒤 공백은 무시하고 대소문자를 가리지 않는다. */
  query: string;
  status: CustomerStatusFilter;
}

/** 검색어와 상태로 고객을 거른다. 순서는 그대로다. */
export function filterCustomers(items: readonly Customer[], filter: CustomerFilter): Customer[] {
  const query = filter.query.trim().toLowerCase();

  return items.filter(
    (c) =>
      (filter.status === "all" || c.status === filter.status) &&
      (query === "" ||
        c.name.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query)),
  );
}
