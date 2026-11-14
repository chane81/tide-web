import { Badge, TableCell, TableRow } from "@tide-design/components";

import { formatCurrency } from "@/libs/formatCurrency";
import { formatDate } from "@/libs/formatDate";

import type { Transaction } from "../apis/cards.types";
import { CATEGORY_LABELS, TRANSACTION_STATUS } from "../constants/transactions";

export interface TransactionRowProps {
  transaction: Transaction;
}

/** 거래 한 행: 가맹점(카테고리), 날짜, 금액, 상태 */
export function TransactionRow({ transaction }: TransactionRowProps) {
  const status = TRANSACTION_STATUS[transaction.status];

  return (
    <TableRow>
      <TableCell>
        <div className="flex flex-col">
          <span className="text-label-md">{transaction.merchant}</span>
          <span className="text-caption text-muted">
            {CATEGORY_LABELS[transaction.category]}
            {/* 좁은 화면에서는 날짜 열을 숨기고 여기에 보인다. */}
            <span className="sm:hidden"> · {formatDate(transaction.occurredAt)}</span>
          </span>
        </div>
      </TableCell>
      <TableCell className="hidden whitespace-nowrap sm:table-cell">
        <time dateTime={transaction.occurredAt}>{formatDate(transaction.occurredAt)}</time>
      </TableCell>
      <TableCell className="text-end tabular-nums">{formatCurrency(transaction.amount)}</TableCell>
      <TableCell>
        <Badge color={status.color} size="sm">
          {status.label}
        </Badge>
      </TableCell>
    </TableRow>
  );
}
