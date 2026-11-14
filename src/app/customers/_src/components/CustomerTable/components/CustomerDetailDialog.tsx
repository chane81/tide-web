import {
  Avatar,
  Badge,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@tide-design/components";

import { formatCurrency } from "@/libs/formatCurrency";
import { formatDate } from "@/libs/formatDate";
import { formatNumber } from "@/libs/formatNumber";

import type { Customer } from "../../../apis/customers.types";
import { CUSTOMER_STATUS } from "../../../constants/customers";

export interface CustomerDetailDialogProps {
  /** 보일 고객. `null`이면 닫힌다. */
  customer: Customer | null;
  onClose: () => void;
}

/** 고객 상세. 트리거 없이 `open`으로 연다. 닫기는 tide `DialogContent`의 닫기 버튼·Esc·바깥 누름이 맡는다. */
export function CustomerDetailDialog({ customer, onClose }: CustomerDetailDialogProps) {
  return (
    <Dialog
      open={customer !== null}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      {customer && (
        <DialogContent>
          <div className="flex items-center gap-3">
            <Avatar alt="" size="lg" color={customer.avatarColor} />
            <div className="flex min-w-0 flex-col gap-0.5">
              <DialogTitle>{customer.name}</DialogTitle>
              <DialogDescription>{customer.email}</DialogDescription>
            </div>
          </div>
          <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-4 text-body-sm">
            <div className="flex flex-col gap-1">
              <dt className="text-muted">상태</dt>
              <dd>
                <Badge color={CUSTOMER_STATUS[customer.status].color} size="sm">
                  {CUSTOMER_STATUS[customer.status].label}
                </Badge>
              </dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted">가입일</dt>
              <dd>{formatDate(customer.joinedAt)}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted">마지막 접속</dt>
              <dd>{formatDate(customer.lastSeenAt)}</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted">주문 수</dt>
              <dd className="tabular-nums">{formatNumber(customer.orders)}건</dd>
            </div>
            <div className="flex flex-col gap-1">
              <dt className="text-muted">누적 결제 금액</dt>
              <dd className="tabular-nums">{formatCurrency(customer.totalSpent)}</dd>
            </div>
          </dl>
        </DialogContent>
      )}
    </Dialog>
  );
}
