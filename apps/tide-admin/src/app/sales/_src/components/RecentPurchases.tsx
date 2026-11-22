import { Card } from "@tide-design/components";

import { getRecentPurchases } from "../apis/sales/sales.api";
import { PurchaseItem } from "./PurchaseItem";

/** 최근 구매 활동 피드 */
export async function RecentPurchases() {
  const { items, asOf } = await getRecentPurchases();
  const now = new Date(asOf).getTime();

  return (
    <Card
      render={<section aria-labelledby="recent-purchases-title" />}
      className="flex flex-col p-6 shadow-sm"
    >
      <h2 className="text-heading-sm" id="recent-purchases-title">
        최근 구매
      </h2>
      <ul className="divide-y divide-default">
        {items.map((purchase) => (
          <PurchaseItem key={purchase.id} purchase={purchase} now={now} />
        ))}
      </ul>
    </Card>
  );
}
