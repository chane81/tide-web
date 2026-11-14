import { Avatar, Link } from "@tide-design/components";
import NextLink from "next/link";

import { formatCurrency } from "@/libs/formatCurrency";

import type { Purchase } from "../apis/sales.types";
import { formatRelativeTime } from "../libs/formatRelativeTime";

export interface PurchaseItemProps {
  purchase: Purchase;
  /** 「n분 전」 기준 시각(ms) */
  now: number;
}

/** 구매 활동 한 줄: 아바타, 「누가 무엇을 샀다」, 금액, 시각 */
export function PurchaseItem({ purchase, now }: PurchaseItemProps) {
  return (
    <li className="flex items-start gap-3 py-3">
      <Avatar src={purchase.customer.avatarUrl} alt="" size="sm" color="purple" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="text-body-sm">
          <span className="text-label-md">{purchase.customer.name}</span>님이{" "}
          <Link render={<NextLink href={purchase.product.href} />}>{purchase.product.name}</Link>
          을(를) 구매했습니다.
        </p>
        <time dateTime={purchase.purchasedAt} className="text-caption text-muted">
          {formatRelativeTime(purchase.purchasedAt, now)}
        </time>
      </div>
      <span className="text-label-md">{formatCurrency(purchase.amount)}</span>
    </li>
  );
}
