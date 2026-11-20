import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { PaymentCard, Transaction } from "../apis/cards.types";
import { CardsWorkspace } from "./CardsWorkspace";

const base = { holder: "KIM HANEUL", expMonth: 8, expYear: 2029, color: "blue" } as const;

const cards: PaymentCard[] = [
  {
    ...base,
    id: "a",
    brand: "visa",
    nickname: "개인",
    last4: "1111",
    balance: 1_000,
    limit: 5_000,
  },
  { ...base, id: "b", brand: "amex", nickname: "여행", last4: "2222", balance: 900, limit: 1_000 },
];

function tx(id: string, cardId: string, merchant: string): Transaction {
  return {
    id,
    cardId,
    merchant,
    category: "food",
    occurredAt: "2026-11-13T00:00:00.000Z",
    amount: 10,
    status: "completed",
  };
}

const transactions = [tx("1", "a", "블루보틀"), tx("2", "b", "대한항공")];

describe("CardsWorkspace", () => {
  it("처음에는 첫 카드를 고른 상태다", () => {
    render(<CardsWorkspace cards={cards} transactions={transactions} />);

    expect(screen.getByRole("button", { name: /개인 VISA 끝자리 1111/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("progressbar", { name: "한도 사용률" })).toHaveAttribute(
      "aria-valuenow",
      "1000",
    );
    expect(screen.getByRole("cell", { name: /블루보틀/ })).toBeInTheDocument();
  });

  it("다른 카드를 고르면 사용액·한도 사용률·거래 내역이 그 카드로 바뀐다", async () => {
    const user = userEvent.setup();
    render(<CardsWorkspace cards={cards} transactions={transactions} />);

    await user.click(screen.getByRole("button", { name: /여행 AMEX 끝자리 2222/ }));

    expect(screen.getByRole("button", { name: /여행 AMEX/ })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(screen.getByRole("button", { name: /개인 VISA/ })).toHaveAttribute(
      "aria-pressed",
      "false",
    );
    const progress = screen.getByRole("progressbar", { name: "한도 사용률" });
    expect(progress).toHaveAttribute("aria-valuenow", "900");
    expect(progress).toHaveAttribute("aria-valuemax", "1000");
    expect(screen.getByText("90% 사용")).toBeInTheDocument();

    const table = screen.getByRole("table", { name: "거래 내역" });
    expect(within(table).getByText("대한항공")).toBeInTheDocument();
    expect(within(table).queryByText("블루보틀")).not.toBeInTheDocument();
  });
});
