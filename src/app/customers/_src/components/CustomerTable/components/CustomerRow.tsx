import { Avatar, Badge, Checkbox, Link, TableCell, TableRow } from "@tide-design/components";

import { formatCurrency } from "@/libs/formatCurrency";
import { formatDate } from "@/libs/formatDate";

import type { Customer } from "../../../apis/customers.types";
import { CUSTOMER_STATUS } from "../../../constants/customers";

export interface CustomerRowProps {
  customer: Customer;
  selected: boolean;
  onToggle: () => void;
  onOpen: () => void;
}

/**
 * 고객 한 행. 행 어디를 눌러도 상세가 열리고(마우스 보조), 키보드는 이름 버튼으로 연다.
 * 체크박스 칸 누름은 행으로 올라가지 않게 막아 상세를 열지 않는다.
 */
export function CustomerRow({ customer, selected, onToggle, onOpen }: CustomerRowProps) {
  const status = CUSTOMER_STATUS[customer.status];

  return (
    // 행 누름은 이름 버튼과 같은 동작의 마우스 보조라 키보드 처리가 따로 없다.
    <TableRow
      onClick={onOpen}
      data-selected={selected || undefined}
      className="cursor-pointer data-selected:bg-active"
    >
      <TableCell className="w-10" onClick={(event) => event.stopPropagation()}>
        <Checkbox
          aria-label={`${customer.name} 선택`}
          checked={selected}
          onChange={onToggle}
          size="sm"
        />
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar alt="" size="sm" color={customer.avatarColor} />
          <Link
            color="neutral"
            render={<button type="button" aria-label={`${customer.name} 상세 보기`} />}
            className="cursor-pointer text-label-md"
          >
            {customer.name}
          </Link>
        </div>
      </TableCell>
      <TableCell className="text-muted">{customer.email}</TableCell>
      <TableCell>
        <Badge color={status.color} size="sm">
          {status.label}
        </Badge>
      </TableCell>
      <TableCell className="whitespace-nowrap">
        <time dateTime={customer.joinedAt}>{formatDate(customer.joinedAt)}</time>
      </TableCell>
      <TableCell className="text-end tabular-nums">{formatCurrency(customer.totalSpent)}</TableCell>
    </TableRow>
  );
}
