import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ToastRegion } from "@tide-design/components";
import { toasts } from "@/libs/toasts";

import { CUSTOMERS_PAGE_SIZE } from "../../constants/customers";
import { customerFixture } from "../../libs/customerFixture";
import { CustomerTable } from "./CustomerTable";

/** 두 페이지 반. 가입일이 늦을수록 번호가 크다(처음 정렬은 가입 최신순). */
const customers = Array.from({ length: CUSTOMERS_PAGE_SIZE * 2 + 5 }, (_, i) =>
  customerFixture({
    id: `c${i + 1}`,
    name: `고객${String(i + 1).padStart(2, "0")}`,
    email: `user${i + 1}@example.com`,
    status: i === 0 ? "churned" : i < 5 ? "dormant" : "active",
    joinedAt: new Date(Date.UTC(2026, 0, i + 1)).toISOString(),
    totalSpent: (i + 1) * 10,
  }),
);

function setup() {
  const user = userEvent.setup();
  render(
    <>
      <CustomerTable customers={customers} />
      <ToastRegion queue={toasts} />
    </>,
  );
  return user;
}

function bodyRows() {
  const table = screen.getByRole("table", { name: "고객 목록" });
  // 첫 행은 머리 행이다.
  return within(table).getAllByRole("row").slice(1);
}

function firstName() {
  return within(bodyRows()[0]!).getByRole("button", { name: /상세 보기/ }).textContent;
}

function nameHeader() {
  return screen.getByRole("columnheader", { name: /이름/ });
}

afterEach(() => {
  toasts.clear();
});

describe("CustomerTable", () => {
  it("이름·이메일·상태·가입일·결제 금액을 보인다", () => {
    setup();

    expect(bodyRows()).toHaveLength(CUSTOMERS_PAGE_SIZE);
    const row = bodyRows()[0]!;
    expect(within(row).getByText("고객25")).toBeInTheDocument();
    // 이메일은 넓은 화면용 열과 좁은 화면용 이름 아래 두 곳에 있고 CSS로 하나만 보인다.
    expect(within(row).getAllByText("user25@example.com")).toHaveLength(2);
    // 상태도 좁은 화면용(이름 옆)과 넓은 화면용(열) 두 곳에 있다.
    expect(within(row).getAllByText("활성")).toHaveLength(2);
    expect(within(row).getByText("$250")).toBeInTheDocument();
  });

  it("이름·이메일로 검색하고, 검색하면 첫 페이지로 돌아간다", async () => {
    const user = setup();

    await user.click(screen.getByRole("button", { name: "2페이지" }));
    await user.type(screen.getByRole("searchbox", { name: "이름·이메일 검색" }), "user1");

    // user1, user10~19
    expect(screen.getByText("25명 중 11명")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "1페이지" })).toHaveAttribute("aria-current", "page");
  });

  it("상태 Select로 거른다", async () => {
    const user = setup();

    // React Aria Select 트리거는 button이고, 이름은 고른 값 + label이다.
    await user.click(screen.getByRole("button", { name: "모든 상태 상태" }));
    await user.click(screen.getByRole("option", { name: "휴면" }));

    expect(bodyRows()).toHaveLength(4);
    for (const row of bodyRows()) expect(within(row).getAllByText("휴면")).toHaveLength(2);
  });

  it("열 머리를 누르면 오름·내림으로 정렬한다", async () => {
    const user = setup();
    const header = nameHeader;

    await user.click(within(header()).getByRole("button"));
    expect(header()).toHaveAttribute("aria-sort", "ascending");
    expect(firstName()).toBe("고객01");

    await user.click(within(header()).getByRole("button"));
    expect(header()).toHaveAttribute("aria-sort", "descending");
    expect(firstName()).toBe("고객25");
  });

  it("결과가 없으면 빈 상태를 보이고, 초기화하면 돌아온다", async () => {
    const user = setup();

    await user.type(screen.getByRole("searchbox", { name: "이름·이메일 검색" }), "없는 고객");
    expect(screen.getByText("조건에 맞는 고객이 없습니다")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "검색 초기화" }));
    expect(bodyRows()).toHaveLength(CUSTOMERS_PAGE_SIZE);
  });

  it("전체 선택은 현재 결과 전체가 대상이고 고른 수를 보인다", async () => {
    const user = setup();

    await user.click(screen.getByRole("checkbox", { name: "검색 결과 전체 선택" }));
    expect(screen.getByText("25명 선택됨")).toBeInTheDocument();

    await user.click(screen.getByRole("checkbox", { name: "고객25 선택" }));
    expect(screen.getByText("24명 선택됨")).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "검색 결과 전체 선택" })).toBePartiallyChecked();
  });

  it("체크박스를 눌러도 상세는 열리지 않는다", async () => {
    const user = setup();

    await user.click(screen.getByRole("checkbox", { name: "고객25 선택" }));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("행을 누르면 고객 상세가 열린다", async () => {
    const user = setup();

    await user.click(within(bodyRows()[0]!).getByText("$250"));

    const dialog = screen.getByRole("dialog", { name: "고객25" });
    expect(within(dialog).getByText("누적 결제 금액")).toBeInTheDocument();
    await user.click(within(dialog).getByRole("button", { name: "닫기" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("일괄 삭제는 확인을 거쳐야 화면에서 지워진다", async () => {
    const user = setup();
    await user.click(screen.getByRole("checkbox", { name: "고객25 선택" }));
    await user.click(screen.getByRole("checkbox", { name: "고객24 선택" }));

    await user.click(screen.getByRole("button", { name: "삭제" }));
    const confirm = screen.getByRole("alertdialog", { name: "고객 2명을 삭제할까요?" });
    await user.click(within(confirm).getByRole("button", { name: "취소" }));
    expect(screen.getByText("고객25")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "삭제" }));
    await user.click(within(screen.getByRole("alertdialog")).getByRole("button", { name: "삭제" }));

    expect(screen.queryByText("고객25")).not.toBeInTheDocument();
    expect(screen.getByText("총 23명")).toBeInTheDocument();
    expect(await screen.findByText("고객 2명을 삭제했습니다")).toBeInTheDocument();
  });

  it("내보내기는 고른 수로 완료 Toast를 띄운다", async () => {
    const user = setup();
    await user.click(screen.getByRole("checkbox", { name: "고객25 선택" }));

    await user.click(screen.getByRole("button", { name: "내보내기" }));

    expect(await screen.findByText("고객 1명을 내보냈습니다")).toBeInTheDocument();
  });
});
