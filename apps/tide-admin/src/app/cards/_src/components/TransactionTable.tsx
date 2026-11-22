"use client";

import {
  Card,
  Table,
  TableBody,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tide-design/components";
import { useState } from "react";

import { PageNavigation } from "@/components/PageNavigation";
import { paginate } from "@/libs/paginate";

import type { Transaction } from "../apis/cards/cards.types";
import { TRANSACTIONS_PAGE_SIZE } from "../constants/transactions";
import { TransactionRow } from "./TransactionRow";

export interface TransactionTableProps {
  /** 고른 카드의 거래(최신순) */
  transactions: Transaction[];
}

/** 거래 내역 표와 페이지 이동. 카드를 바꾸면 부모가 `key`를 바꿔 첫 페이지로 돌아온다. */
export function TransactionTable({ transactions }: TransactionTableProps) {
  const [page, setPage] = useState(1);
  const current = paginate(transactions, page, TRANSACTIONS_PAGE_SIZE);

  return (
    <Card
      render={<section aria-labelledby="transactions-title" />}
      className="flex flex-col gap-4 p-6 shadow-sm"
    >
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-heading-sm" id="transactions-title">
          거래 내역
        </h2>
        <p className="text-body-sm text-muted">총 {current.total}건</p>
      </div>
      <div className="overflow-x-auto">
        <Table aria-labelledby="transactions-title">
          <TableHead>
            <TableRow>
              <TableHeaderCell>가맹점</TableHeaderCell>
              <TableHeaderCell className="hidden sm:table-cell">날짜</TableHeaderCell>
              <TableHeaderCell className="text-end">금액</TableHeaderCell>
              <TableHeaderCell>상태</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {current.items.map((tx) => (
              <TransactionRow key={tx.id} transaction={tx} />
            ))}
          </TableBody>
        </Table>
      </div>
      {current.pageCount > 1 && (
        <PageNavigation
          aria-label="거래 내역 페이지"
          page={current.page}
          pageCount={current.pageCount}
          onPageChange={setPage}
        />
      )}
    </Card>
  );
}
