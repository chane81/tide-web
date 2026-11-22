import { Card, Progress } from "@tide-design/components";

import { formatCurrency } from "@/libs/formatCurrency";

import type { Transaction } from "../apis/cards/cards.types";
import { CATEGORY_LABELS } from "../constants/transactions";
import { sumByCategory } from "../libs/sumByCategory";

export interface CategorySpendingProps {
  transactions: Transaction[];
}

/** 카테고리별 지출. 전체 지출에서 차지하는 비율을 Progress로 보인다. */
export function CategorySpending({ transactions }: CategorySpendingProps) {
  const items = sumByCategory(transactions);

  return (
    <Card
      render={<section aria-labelledby="category-spending-title" />}
      className="flex flex-col gap-4 p-6 shadow-sm"
    >
      <h2 className="text-heading-sm" id="category-spending-title">
        카테고리별 지출
      </h2>
      {items.length === 0 ? (
        <p className="text-body-sm text-muted">지출이 없습니다.</p>
      ) : (
        <ul className="flex flex-col gap-3">
          {items.map((item) => {
            const label = CATEGORY_LABELS[item.category];

            return (
              <li key={item.category} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-body-sm">
                  <span>{label}</span>
                  <span className="tabular-nums">
                    {formatCurrency(item.amount)}
                    <span className="text-muted"> · {Math.round(item.share * 100)}%</span>
                  </span>
                </div>
                <Progress aria-label={`${label} 지출 비율`} value={item.share * 100} size="sm" />
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}
