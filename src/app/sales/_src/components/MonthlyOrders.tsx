import { Card, Typography } from "@tide-design/components";

import { getMonthlyOrders } from "../apis/sales.api";
import { MonthlyOrdersChart } from "./MonthlyOrdersChart";

/** 월별 주문 카드. 데이터를 읽어 client 차트에 넘긴다. */
export async function MonthlyOrders() {
  const { items } = await getMonthlyOrders();

  return (
    <Card
      render={<section aria-labelledby="monthly-orders-title" />}
      className="flex flex-col gap-4 p-6"
    >
      <Typography variant="heading-sm" level={2} id="monthly-orders-title">
        월별 주문
      </Typography>
      <MonthlyOrdersChart items={items} />
    </Card>
  );
}
