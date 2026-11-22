"use client";

import { useState } from "react";

import type { PaymentCard, Transaction } from "../apis/cards/cards.types";
import { CardLimit } from "./CardLimit";
import { CardPicker } from "./CardPicker";
import { CategorySpending } from "./CategorySpending";
import { TransactionTable } from "./TransactionTable";

export interface CardsWorkspaceProps {
  cards: PaymentCard[];
  /** 모든 카드의 거래(최신순) */
  transactions: Transaction[];
}

/**
 * 카드 화면 본문. 고른 카드를 상태로 들고, 사용액·카테고리 지출·거래 내역을 그 카드로 바꾼다.
 * 카드 전환은 미리 받은 데이터를 client에서 거른다.
 */
export function CardsWorkspace({ cards, transactions }: CardsWorkspaceProps) {
  const [selectedId, setSelectedId] = useState(cards[0]?.id ?? "");
  const card = cards.find((c) => c.id === selectedId);
  const own = transactions.filter((tx) => tx.cardId === selectedId);

  if (!card) return null;

  return (
    <div className="flex flex-col gap-6">
      <CardPicker cards={cards} selectedId={selectedId} onSelect={setSelectedId} />
      <div className="grid gap-6 lg:grid-cols-2">
        <CardLimit card={card} transactions={own} />
        <CategorySpending transactions={own} />
      </div>
      <TransactionTable key={selectedId} transactions={own} />
    </div>
  );
}
