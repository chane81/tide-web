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
          <Avatar
            src={customer.avatarUrl}
            alt=""
            size="sm"
            color={customer.avatarColor}
            className="hidden sm:inline-flex"
          />
          <div className="flex min-w-0 flex-col items-start">
            <div className="flex items-center gap-2">
              <Link
                color="neutral"
                render={<button type="button" aria-label={`${customer.name} 상세 보기`} />}
                // 표 안 이름은 문장 속 링크가 아니라 행마다 밑줄이 줄지어 시끄럽다. 가리킬 때만 밑줄을 보인다.
                className="cursor-pointer text-label-md no-underline hover:underline"
              >
                {customer.name}
              </Link>
              {/* 아주 좁은 화면에서는 상태 열을 숨기고 이름 옆에 보인다. */}
              <Badge color={status.color} size="sm" className="sm:hidden">
                {status.label}
              </Badge>
            </div>
            {/* 좁은 화면에서는 이메일 열을 숨기고 이름 아래에 보인다. 아주 좁으면 말줄임(전체는 상세에서). */}
            <span className="max-w-32 truncate text-caption text-muted sm:max-w-none xl:hidden">
              {customer.email}
            </span>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden text-muted xl:table-cell">{customer.email}</TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge color={status.color} size="sm">
          {status.label}
        </Badge>
      </TableCell>
      <TableCell className="hidden whitespace-nowrap md:table-cell">
        <time dateTime={customer.joinedAt}>{formatDate(customer.joinedAt)}</time>
      </TableCell>
      <TableCell className="text-end tabular-nums">{formatCurrency(customer.totalSpent)}</TableCell>
    </TableRow>
  );
}
