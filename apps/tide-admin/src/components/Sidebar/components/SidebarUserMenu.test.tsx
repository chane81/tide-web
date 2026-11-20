import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SidebarUserMenu } from "./SidebarUserMenu";

const push = vi.fn<(href: string) => void>();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

const user = { name: "김하늘", email: "haneul.kim@example.com" };

describe("SidebarUserMenu", () => {
  it("유저 카드에 이름과 이메일을 보여 준다", () => {
    render(<SidebarUserMenu user={user} />);

    const trigger = screen.getByRole("button", { name: "김하늘 계정 메뉴" });
    expect(trigger).toHaveTextContent("haneul.kim@example.com");
  });

  it("누르면 프로필·설정·로그아웃 메뉴가 열리고, 설정을 고르면 /settings로 간다", async () => {
    const u = userEvent.setup();
    render(<SidebarUserMenu user={user} />);

    await u.click(screen.getByRole("button", { name: "김하늘 계정 메뉴" }));

    expect(await screen.findByRole("menuitem", { name: "프로필" })).toBeInTheDocument();
    expect(screen.getByRole("menuitem", { name: "로그아웃" })).toBeInTheDocument();

    await u.click(screen.getByRole("menuitem", { name: "설정" }));
    expect(push).toHaveBeenCalledWith("/settings");
  });
});
