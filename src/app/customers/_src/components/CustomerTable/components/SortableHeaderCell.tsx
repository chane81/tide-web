import { TableHeaderCell } from "@tide-design/components";
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from "@tide-design/icons";
import type { ReactNode } from "react";

import type { SortDirection } from "../../../libs/sortCustomers";

export interface SortableHeaderCellProps {
  children: ReactNode;
  /** 이 열이 정렬 기준이면 그 방향, 아니면 `null` */
  direction: SortDirection | null;
  onSort: () => void;
  /** 숫자 열처럼 끝에 맞출 때 */
  align?: "start" | "end";
}

/**
 * 누르면 정렬하는 열 머리. tide Table에 정렬이 없어 머리 칸 안에 버튼을 두고 `aria-sort`를 직접 붙인다
 * (docs/tide-gaps.md).
 */
export function SortableHeaderCell({
  children,
  direction,
  onSort,
  align = "start",
}: SortableHeaderCellProps) {
  const Icon =
    direction === "asc" ? ArrowUpIcon : direction === "desc" ? ArrowDownIcon : ArrowUpDownIcon;

  return (
    <TableHeaderCell
      aria-sort={
        direction === "asc" ? "ascending" : direction === "desc" ? "descending" : undefined
      }
      className={align === "end" ? "text-end" : undefined}
    >
      <button
        type="button"
        onClick={onSort}
        className={`inline-flex cursor-pointer items-center gap-1 rounded-sm focus-visible:focus-ring ${
          direction ? "text-default" : ""
        }`}
      >
        {children}
        <Icon className={direction ? undefined : "text-muted"} />
      </button>
    </TableHeaderCell>
  );
}
