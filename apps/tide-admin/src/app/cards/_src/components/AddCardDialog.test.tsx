import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ToastRegion } from "@tide-design/components";
import { toasts } from "@/libs/toasts";

import { AddCardDialog } from "./AddCardDialog";

afterEach(() => {
  toasts.clear();
});

describe("AddCardDialog", () => {
  it("「카드 추가」로 열고 취소로 닫는다", async () => {
    const user = userEvent.setup();
    render(<AddCardDialog />);

    await user.click(screen.getByRole("button", { name: "카드 추가" }));
    expect(screen.getByRole("dialog", { name: "카드 추가" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "취소" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("입력해 추가하면 닫히고 완료 Toast가 뜬다", async () => {
    const user = userEvent.setup();
    render(
      <>
        <AddCardDialog />
        <ToastRegion queue={toasts} />
      </>,
    );

    await user.click(screen.getByRole("button", { name: "카드 추가" }));
    await user.type(screen.getByLabelText("카드 별칭"), "생활비");
    await user.type(screen.getByLabelText(/카드 번호/), "4111111111111111");
    await user.type(screen.getByLabelText(/만료일/), "12/30");
    await user.type(screen.getByLabelText(/CVC/), "123");
    await user.click(screen.getByRole("button", { name: "추가" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(await screen.findByText("카드를 추가했습니다")).toBeInTheDocument();
    expect(screen.getByText(/생활비/)).toBeInTheDocument();
  });
});
