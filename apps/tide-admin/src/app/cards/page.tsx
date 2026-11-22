import type { Metadata } from "next";

import { PageHeader } from "@/components/PageHeader";

import { getCards, getTransactions } from "./_src/apis/cards/cards.api";
import { AddCardDialog } from "./_src/components/AddCardDialog";
import { CardsWorkspace } from "./_src/components/CardsWorkspace";

export const metadata: Metadata = { title: "카드" };

export default async function Page() {
  const [{ items: cards }, { items: transactions }] = await Promise.all([
    getCards(),
    getTransactions(),
  ]);

  return (
    <>
      <PageHeader
        title="카드"
        description="내 카드와 거래 내역을 봅니다."
        breadcrumbs={[{ label: "분석" }, { label: "카드" }]}
        actions={<AddCardDialog />}
      />
      <CardsWorkspace cards={cards} transactions={transactions} />
    </>
  );
}
