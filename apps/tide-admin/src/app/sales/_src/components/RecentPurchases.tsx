import { Card, Typography } from "@tide-design/components";

import { getRecentPurchases } from "../apis/sales.api";
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
      <Typography variant="heading-sm" level={2} id="recent-purchases-title">
        최근 구매
      </Typography>
      <ul className="divide-y divide-default">
        {items.map((purchase) => (
          <PurchaseItem key={purchase.id} purchase={purchase} now={now} />
        ))}
      </ul>
    </Card>
  );
}
