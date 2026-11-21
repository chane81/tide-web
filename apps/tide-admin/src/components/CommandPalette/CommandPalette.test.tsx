import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { NavItem } from "@/components/Sidebar";

import { CommandPalette } from "./CommandPalette";
import { useCommandPaletteContext } from "./hooks/useCommandPaletteContext";

const push = vi.hoisted(() => vi.fn<(href: string) => void>());
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

const items: NavItem[] = [
  { href: "/", label: "개요", icon: null },
  {
    label: "분석",
    icon: null,
    children: [
      { href: "/sales", label: "매출", icon: null },
      { href: "/cards", label: "카드", icon: null },
    ],
  },
  { href: "https://example.com/help", label: "지원", icon: null },
];

function Opener() {
  const { openPalette } = useCommandPaletteContext();

  return (
    <button type="button" onClick={openPalette}>
      열기
    </button>
  );
}

function setup() {
  push.mockClear();
  render(
    <CommandPalette items={items}>
      <Opener />
    </CommandPalette>,
  );

  return userEvent.setup();
}

describe("CommandPalette", () => {
  it("⌘K와 Ctrl+K로 열고 닫는다", async () => {
    const user = setup();

    await user.keyboard("{Meta>}k{/Meta}");
    expect(screen.getByRole("combobox", { name: "이동할 페이지 검색" })).toHaveFocus();

    await user.keyboard("{Control>}k{/Control}");
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  it("검색한 페이지로 Enter로 이동하고 닫는다", async () => {
    const user = setup();
    await user.click(screen.getByRole("button", { name: "열기" }));

    await user.keyboard("카드");
    expect(screen.getAllByRole("option")).toHaveLength(1);
    await user.keyboard("{Enter}");

    expect(push).toHaveBeenCalledWith("/cards");
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  it("방향키로 활성 항목을 옮기고 끝에서 돌아온다", async () => {
    const user = setup();
    await user.click(screen.getByRole("button", { name: "열기" }));

    await user.keyboard("{ArrowDown}");
    expect(screen.getByRole("option", { name: /매출/ })).toHaveAttribute("aria-selected", "true");

    await user.keyboard("{ArrowUp}{ArrowUp}");
    expect(screen.getByRole("option", { name: "지원" })).toHaveAttribute("aria-selected", "true");
  });

  it("바깥 주소는 새 탭으로 열고 앱 라우터를 쓰지 않는다", async () => {
    const user = setup();
    const open = vi.spyOn(window, "open").mockReturnValue(null);
    await user.click(screen.getByRole("button", { name: "열기" }));

    await user.click(screen.getByRole("option", { name: "지원" }));

    expect(open).toHaveBeenCalledWith("https://example.com/help", "_blank", "noopener,noreferrer");
    expect(push).not.toHaveBeenCalled();
    open.mockRestore();
  });

  it("결과가 없으면 안내하고 Enter는 아무 일도 하지 않는다", async () => {
    const user = setup();
    await user.click(screen.getByRole("button", { name: "열기" }));

    await user.keyboard("없는메뉴{Enter}");

    expect(screen.getByRole("status")).toHaveTextContent("검색 결과가 없습니다");
    expect(push).not.toHaveBeenCalled();
  });
});
