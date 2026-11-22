import { MoonIcon, UserCheckIcon, UsersIcon, WalletIcon } from "@tide-design/icons";

import { formatCurrency } from "@/libs/formatCurrency";
import { formatNumber } from "@/libs/formatNumber";
import { formatPercent } from "@/libs/formatPercent";

import type { Customer } from "../apis/customers/customers.types";
import { summarizeCustomers } from "../libs/summarizeCustomers";
import { CustomerSummaryCard } from "./CustomerSummaryCard";

export interface CustomerSummaryProps {
  customers: Customer[];
}

/** 고객 표 위 요약 지표 네 칸: 전체 고객, 활성, 휴면, 총 결제 금액 */
export function CustomerSummary({ customers }: CustomerSummaryProps) {
  const summary = summarizeCustomers(customers);
  const share = (count: number) =>
    `전체의 ${formatPercent(summary.total === 0 ? 0 : count / summary.total)}`;

  return (
    <section aria-label="고객 요약" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <CustomerSummaryCard
        label="전체 고객"
        value={`${formatNumber(summary.total)}명`}
        hint={`이탈 ${formatNumber(summary.byStatus.churned)}명 포함`}
        icon={<UsersIcon size={20} />}
        color="primary"
      />
      <CustomerSummaryCard
        label="활성"
        value={`${formatNumber(summary.byStatus.active)}명`}
        hint={share(summary.byStatus.active)}
        icon={<UserCheckIcon size={20} />}
        color="success"
      />
      <CustomerSummaryCard
        label="휴면"
        value={`${formatNumber(summary.byStatus.dormant)}명`}
        hint={share(summary.byStatus.dormant)}
        icon={<MoonIcon size={20} />}
        color="warning"
      />
      <CustomerSummaryCard
        label="총 결제 금액"
        value={formatCurrency(summary.totalSpent)}
        hint={`1인 평균 ${formatCurrency(summary.averageSpent)}`}
        icon={<WalletIcon size={20} />}
        color="info"
      />
    </section>
  );
}
