import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { Transaction } from "../apis/cards.types";
import { TRANSACTIONS_PAGE_SIZE } from "../constants/transactions";
import { TransactionTable } from "./TransactionTable";

/** 두 페이지 반 분량. 가맹점 이름이 순서를 말한다. */
const transactions: Transaction[] = Array.from(
  { length: TRANSACTIONS_PAGE_SIZE * 2 + 3 },
  (_, i) => ({
    id: `tx-${i + 1}`,
    cardId: "a",
    merchant: `가맹점 ${i + 1}`,
    category: "food",
    occurredAt: "2026-11-13T00:00:00.000Z",
    amount: 10,
    status: i === 0 ? "pending" : i === 1 ? "canceled" : "completed",
  }),
);

function bodyRows() {
  // 첫 행은 머리 행이다.
  return within(screen.getByRole("table", { name: "거래 내역" }))
    .getAllByRole("row")
    .slice(1);
}

describe("TransactionTable", () => {
  it("첫 페이지 행과 상태 배지를 보인다", () => {
    render(<TransactionTable transactions={transactions} />);

    expect(bodyRows()).toHaveLength(TRANSACTIONS_PAGE_SIZE);
    expect(within(bodyRows()[0]!).getByText("대기")).toBeInTheDocument();
    expect(within(bodyRows()[1]!).getByText("취소")).toBeInTheDocument();
    expect(within(bodyRows()[2]!).getByText("완료")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1페이지" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "이전 페이지" })).toBeDisabled();
  });

  it("번호·다음 버튼으로 페이지를 넘긴다", async () => {
    const user = userEvent.setup();
    render(<TransactionTable transactions={transactions} />);

    await user.click(screen.getByRole("button", { name: "2페이지" }));
    expect(
      within(bodyRows()[0]!).getByText(`가맹점 ${TRANSACTIONS_PAGE_SIZE + 1}`),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "2페이지" })).toHaveAttribute("aria-current", "page");

    await user.click(screen.getByRole("button", { name: "다음 페이지" }));
    expect(bodyRows()).toHaveLength(3);
    expect(screen.getByRole("button", { name: "다음 페이지" })).toBeDisabled();
  });

  it("한 페이지면 Pagination을 그리지 않는다", () => {
    render(<TransactionTable transactions={transactions.slice(0, 3)} />);

    expect(screen.queryByRole("navigation", { name: "거래 내역 페이지" })).not.toBeInTheDocument();
  });
});
