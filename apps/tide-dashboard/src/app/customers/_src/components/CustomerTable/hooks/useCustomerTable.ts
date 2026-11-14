import { useState } from "react";

import { paginate } from "@/libs/paginate";

import type { Customer } from "../../../apis/customers.types";
import { CUSTOMERS_PAGE_SIZE } from "../../../constants/customers";
import { type CustomerStatusFilter, filterCustomers } from "../../../libs/filterCustomers";
import {
  type CustomerSort,
  type CustomerSortKey,
  sortCustomers,
} from "../../../libs/sortCustomers";

/** 표가 처음 보이는 정렬: 가입 최신순 */
const INITIAL_SORT: CustomerSort = { key: "joinedAt", direction: "desc" };

/**
 * 고객 표 상태(검색어, 상태 필터, 정렬, 페이지, 선택)와 화면에서 지운 고객을 한곳에서 관리한다.
 * 목록 가공은 `filterCustomers`·`sortCustomers`·`paginate`가 맡는다.
 *
 * - 검색·필터를 바꾸면 첫 페이지로 가고, 선택은 새 결과에 남는 고객만 남긴다(안 보이는 고객이 일괄 동작에 섞이지 않게).
 * - 전체 선택은 현재 페이지가 아니라 현재 결과 전체가 대상이다.
 */
export function useCustomerTable(initialItems: readonly Customer[]) {
  const [items, setItems] = useState(initialItems);
  const [query, setQueryState] = useState("");
  const [status, setStatusState] = useState<CustomerStatusFilter>("all");
  const [sort, setSort] = useState<CustomerSort>(INITIAL_SORT);
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<ReadonlySet<string>>(new Set());

  const results = sortCustomers(filterCustomers(items, { query, status }), sort);
  const current = paginate(results, page, CUSTOMERS_PAGE_SIZE);
  const selectedCount = results.filter((c) => selectedIds.has(c.id)).length;

  /** 검색·필터가 바뀐 뒤: 첫 페이지로, 선택은 새 결과에 있는 것만 */
  function applyFilter(nextQuery: string, nextStatus: CustomerStatusFilter) {
    const visible = new Set(
      filterCustomers(items, { query: nextQuery, status: nextStatus }).map((c) => c.id),
    );
    setQueryState(nextQuery);
    setStatusState(nextStatus);
    setPage(1);
    setSelectedIds((prev) => new Set([...prev].filter((id) => visible.has(id))));
  }

  return {
    query,
    status,
    sort,
    /** 이 페이지 행과 페이지 정보 */
    page: current,
    /** 검색·필터 결과 수(모든 페이지) */
    resultCount: results.length,
    /** 화면에 남은 고객 수(검색·필터 전) */
    totalCount: items.length,
    selectedCount,
    allSelected: results.length > 0 && selectedCount === results.length,
    isSelected: (id: string) => selectedIds.has(id),

    setQuery: (next: string) => applyFilter(next, status),
    setStatus: (next: CustomerStatusFilter) => applyFilter(query, next),
    resetFilter: () => applyFilter("", "all"),
    setPage,

    /** 같은 열을 다시 누르면 방향을 바꾸고, 다른 열은 오름차순부터. 첫 페이지로 간다. */
    toggleSort(key: CustomerSortKey) {
      setSort((prev) =>
        prev.key === key
          ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
          : { key, direction: "asc" },
      );
      setPage(1);
    },

    toggleRow(id: string) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    },

    /** 결과 전체가 선택돼 있으면 모두 풀고, 아니면 결과 전체를 고른다. */
    toggleAll() {
      setSelectedIds(
        selectedCount === results.length ? new Set() : new Set(results.map((c) => c.id)),
      );
    },

    /** 고른 고객(현재 결과 안)을 돌려준다. 내보내기 등에 쓴다. */
    getSelected: () => results.filter((c) => selectedIds.has(c.id)),

    /** 고른 고객을 화면 상태에서 지운다(목업이라 서버에는 반영하지 않는다). 지운 수를 돌려준다. */
    deleteSelected() {
      const ids = new Set(results.filter((c) => selectedIds.has(c.id)).map((c) => c.id));
      setItems((prev) => prev.filter((c) => !ids.has(c.id)));
      setSelectedIds(new Set());
      return ids.size;
    },
  };
}

export type CustomerTableState = ReturnType<typeof useCustomerTable>;
