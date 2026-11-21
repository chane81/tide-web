import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { NavGroupItem, NavLinkItem } from "../types";
import { SidebarNavItem } from "./SidebarNavItem";

const pathname = vi.hoisted(() => ({ current: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));

const items: NavLinkItem[] = [
  { href: "/", label: "개요", icon: null },
  { href: "/customers", label: "고객", icon: null, badge: 12 },
  { href: "https://example.com/help", label: "지원", icon: null },
];

function renderNav(path: string) {
  pathname.current = path;
  render(
    <ul>
      {items.map((item) => (
        <SidebarNavItem key={item.href} item={item} />
      ))}
    </ul>,
  );
}

describe("SidebarNavItem", () => {
  it("현재 경로의 항목만 aria-current=page를 가진다", () => {
    renderNav("/customers");

    expect(screen.getByRole("link", { name: /고객/ })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "개요" })).not.toHaveAttribute("aria-current");
  });

  it("하위 경로에서도 상위 메뉴가 활성이고, 개요는 루트에서만 활성이다", () => {
    renderNav("/customers/42");

    expect(screen.getByRole("link", { name: /고객/ })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "개요" })).not.toHaveAttribute("aria-current");
  });

  it("숫자 배지를 이름과 함께 보여 준다", () => {
    renderNav("/");

    expect(screen.getByRole("link", { name: "개요" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: /고객/ })).toHaveTextContent("12");
  });

  it("바깥 주소는 새 탭으로 연다", () => {
    renderNav("/");

    expect(screen.getByRole("link", { name: "지원" })).toHaveAttribute("target", "_blank");
  });

  describe("2depth", () => {
    const group: NavGroupItem = {
      label: "분석",
      icon: null,
      children: [
        { href: "/sales", label: "매출", icon: null },
        { href: "/cards", label: "카드", icon: null, badge: 2 },
      ],
    };

    function renderGroup(path: string) {
      pathname.current = path;
      render(
        <ul>
          <SidebarNavItem item={group} />
        </ul>,
      );
    }

    it("처음에는 펼쳐져 있고 현재 하위 메뉴만 aria-current=page를 가진다", () => {
      renderGroup("/sales");

      expect(screen.getByRole("button", { name: "분석" })).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("link", { name: "매출" })).toHaveAttribute("aria-current", "page");
      expect(screen.queryByRole("link", { name: "분석" })).not.toBeInTheDocument();
    });

    it("접으면 하위 메뉴를 inert로 막고 다시 펼칠 수 있다", async () => {
      const user = userEvent.setup();
      renderGroup("/");
      const toggle = screen.getByRole("button", { name: "분석" });

      await user.click(toggle);
      expect(toggle).toHaveAttribute("aria-expanded", "false");
      expect(screen.getByRole("link", { name: "매출" }).closest("[inert]")).not.toBeNull();

      await user.click(toggle);
      expect(toggle).toHaveAttribute("aria-expanded", "true");
      expect(screen.getByRole("link", { name: "매출" }).closest("[inert]")).toBeNull();
    });

    it("부모 줄을 눌러도 페이지 이동 없이 펼침만 바뀐다", async () => {
      const user = userEvent.setup();
      renderGroup("/sales");
      const parent = screen.getByRole("button", { name: "분석" });

      await user.click(parent);

      expect(parent.tagName).toBe("BUTTON");
      expect(parent).toHaveAttribute("aria-expanded", "false");
    });

    it("exact 메뉴는 형제의 하위 경로에서 활성이 되지 않는다", () => {
      pathname.current = "/customers/segments";
      render(
        <ul>
          <SidebarNavItem
            item={{
              label: "고객",
              icon: null,
              children: [
                { href: "/customers", label: "고객 목록", icon: null, exact: true },
                { href: "/customers/segments", label: "세그먼트", icon: null },
              ],
            }}
          />
        </ul>,
      );

      expect(screen.getByRole("link", { name: "고객 목록" })).not.toHaveAttribute("aria-current");
      expect(screen.getByRole("link", { name: "세그먼트" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });

    it("현재 페이지가 접힌 안쪽에 있으면 부모를 강조하되 aria-current는 붙이지 않는다", async () => {
      const user = userEvent.setup();
      renderGroup("/cards");

      await user.click(screen.getByRole("button", { name: "분석" }));

      const parent = screen.getByRole("button", { name: "분석" });
      expect(parent).toHaveClass("bg-active");
      expect(parent).not.toHaveAttribute("aria-current");
    });
  });
});
