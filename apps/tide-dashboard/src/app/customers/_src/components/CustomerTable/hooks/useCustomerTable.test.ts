import { act, renderHook } from "@testing-library/react";

import { CUSTOMERS_PAGE_SIZE } from "../../../constants/customers";
import { customerFixture } from "../../../libs/customerFixture";
import { useCustomerTable } from "./useCustomerTable";

/** 두 페이지 반. 앞 절반은 활성, 뒤는 휴면 */
const items = Array.from({ length: CUSTOMERS_PAGE_SIZE * 2 + 5 }, (_, i) =>
  customerFixture({
    id: `c${i + 1}`,
    name: `고객${i + 1}`,
    status: i < 12 ? "active" : "dormant",
    joinedAt: new Date(Date.UTC(2026, 0, i + 1)).toISOString(),
  }),
);

function setup() {
  return renderHook(() => useCustomerTable(items));
}

describe("useCustomerTable", () => {
  it("처음에는 가입 최신순 첫 페이지다", () => {
    const { result } = setup();

    expect(result.current.page.page).toBe(1);
    expect(result.current.page.items[0]?.id).toBe("c25");
    expect(result.current.page.pageCount).toBe(3);
  });

  it("검색·필터를 바꾸면 첫 페이지로 돌아간다", () => {
    const { result } = setup();

    act(() => result.current.setPage(3));
    act(() => result.current.setQuery("고객1"));
    expect(result.current.page.page).toBe(1);

    act(() => result.current.setPage(2));
    act(() => result.current.setStatus("dormant"));
    expect(result.current.page.page).toBe(1);
    // 「고객1」을 포함하는 휴면 고객: 고객13~19
    expect(result.current.resultCount).toBe(7);
  });

  it("전체 선택은 현재 결과 전체가 대상이고, 다시 누르면 모두 푼다", () => {
    const { result } = setup();

    act(() => result.current.setStatus("active"));
    act(() => result.current.toggleAll());
    expect(result.current.selectedCount).toBe(12);
    expect(result.current.allSelected).toBe(true);

    act(() => result.current.toggleAll());
    expect(result.current.selectedCount).toBe(0);
  });

  it("필터를 바꾸면 새 결과에 없는 선택은 버린다", () => {
    const { result } = setup();

    act(() => result.current.toggleRow("c1"));
    act(() => result.current.toggleRow("c20"));
    act(() => result.current.setStatus("active"));
    act(() => result.current.setStatus("all"));

    expect(result.current.isSelected("c1")).toBe(true);
    expect(result.current.isSelected("c20")).toBe(false);
  });

  it("정렬 열을 다시 누르면 방향이 바뀐다", () => {
    const { result } = setup();

    act(() => result.current.toggleSort("name"));
    expect(result.current.sort).toEqual({ key: "name", direction: "asc" });
    act(() => result.current.toggleSort("name"));
    expect(result.current.sort).toEqual({ key: "name", direction: "desc" });
  });

  it("고른 고객을 지우면 목록과 선택에서 빠진다", () => {
    const { result } = setup();

    act(() => result.current.toggleRow("c25"));
    act(() => result.current.toggleRow("c24"));
    let deleted = 0;
    act(() => {
      deleted = result.current.deleteSelected();
    });

    expect(deleted).toBe(2);
    expect(result.current.totalCount).toBe(items.length - 2);
    expect(result.current.selectedCount).toBe(0);
    expect(result.current.page.items[0]?.id).toBe("c23");
  });
});
