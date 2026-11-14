import { cacheLife } from "next/cache";

import { cardsMock, transactionsMock } from "./cards.mock";
import type { GetCardsResponse, GetTransactionsResponse } from "./cards.types";

/** 내 카드 목록. 목업이다. */
export async function getCards(): Promise<GetCardsResponse> {
  "use cache";
  cacheLife("hours");

  return { items: cardsMock };
}

/** 모든 카드의 거래(최신순). 카드 고르기·페이지 나누기는 client에서 한다. */
export async function getTransactions(): Promise<GetTransactionsResponse> {
  "use cache";
  cacheLife("minutes");

  return { items: transactionsMock };
}
