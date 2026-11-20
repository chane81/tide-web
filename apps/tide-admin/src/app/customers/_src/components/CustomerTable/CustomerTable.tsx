"use client";

import {
  Card,
  Checkbox,
  Table,
  TableBody,
  TableHead,
  TableHeaderCell,
  TableRow,
  Typography,
} from "@tide-design/components";
import { useState } from "react";

import { PageNavigation } from "@/components/PageNavigation";
import { toasts } from "@/libs/toasts";

import type { Customer } from "../../apis/customers.types";
import type { CustomerSortKey } from "../../libs/sortCustomers";
import { BulkActions } from "./components/BulkActions";
import { CustomerDetailDialog } from "./components/CustomerDetailDialog";
import { CustomerEmptyState } from "./components/CustomerEmptyState";
import { CustomerRow } from "./components/CustomerRow";
import { CustomerToolbar } from "./components/CustomerToolbar";
import { SortableHeaderCell } from "./components/SortableHeaderCell";
import { useCustomerTable } from "./hooks/useCustomerTable";

/** 선택 열 + 이름·이메일·상태·가입일·결제 금액 */
const COLUMN_COUNT = 6;

export interface CustomerTableProps {
  customers: Customer[];
}

/** 검색·필터·정렬·페이지·다중 선택이 되는 고객 표와 일괄 동작, 고객 상세 */
export function CustomerTable({ customers }: CustomerTableProps) {
  const table = useCustomerTable(customers);
  const [detail, setDetail] = useState<Customer | null>(null);
  const someSelected = table.selectedCount > 0 && !table.allSelected;

  function sortProps(key: CustomerSortKey) {
    return {
      direction: table.sort.key === key ? table.sort.direction : null,
      onSort: () => table.toggleSort(key),
    };
  }

  function handleExport() {
    toasts.add({
      title: `고객 ${table.selectedCount}명을 내보냈습니다`,
      description: "customers.csv",
      color: "success",
    });
  }

  function handleDelete() {
    const count = table.deleteSelected();
    toasts.add({ title: `고객 ${count}명을 삭제했습니다`, color: "success" });
  }

  return (
    <Card
      render={<section aria-labelledby="customers-title" />}
      className="flex flex-col gap-4 p-6 shadow-sm"
    >
      <div className="flex items-baseline justify-between gap-2">
        <Typography variant="heading-sm" level={2} id="customers-title">
          고객 목록
        </Typography>
        <Typography variant="body-sm" className="text-muted">
          {table.resultCount === table.totalCount
            ? `총 ${table.totalCount}명`
            : `${table.totalCount}명 중 ${table.resultCount}명`}
        </Typography>
      </div>
      <CustomerToolbar
        query={table.query}
        status={table.status}
        onQueryChange={table.setQuery}
        onStatusChange={table.setStatus}
      />
      <BulkActions
        selectedCount={table.selectedCount}
        onExport={handleExport}
        onDelete={handleDelete}
      />
      <div className="overflow-x-auto">
        <Table aria-labelledby="customers-title">
          <TableHead>
            <TableRow>
              <TableHeaderCell className="w-10">
                <Checkbox
                  aria-label="검색 결과 전체 선택"
                  size="sm"
                  checked={table.allSelected}
                  indeterminate={someSelected}
                  disabled={table.resultCount === 0}
                  onChange={table.toggleAll}
                />
              </TableHeaderCell>
              <SortableHeaderCell {...sortProps("name")}>이름</SortableHeaderCell>
              <TableHeaderCell className="hidden xl:table-cell">이메일</TableHeaderCell>
              <TableHeaderCell className="hidden sm:table-cell">상태</TableHeaderCell>
              <SortableHeaderCell {...sortProps("joinedAt")} className="hidden md:table-cell">
                가입일
              </SortableHeaderCell>
              <SortableHeaderCell {...sortProps("totalSpent")} align="end">
                결제 금액
              </SortableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {table.page.items.length === 0 ? (
              <CustomerEmptyState colSpan={COLUMN_COUNT} onReset={table.resetFilter} />
            ) : (
              table.page.items.map((customer) => (
                <CustomerRow
                  key={customer.id}
                  customer={customer}
                  selected={table.isSelected(customer.id)}
                  onToggle={() => table.toggleRow(customer.id)}
                  onOpen={() => setDetail(customer)}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>
      {table.page.pageCount > 1 && (
        <PageNavigation
          aria-label="고객 목록 페이지"
          page={table.page.page}
          pageCount={table.page.pageCount}
          onPageChange={table.setPage}
        />
      )}
      <CustomerDetailDialog customer={detail} onClose={() => setDetail(null)} />
    </Card>
  );
}
