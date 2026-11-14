import { render, screen } from "@testing-library/react";

import type { NavItem } from "../types";
import { SidebarNavItem } from "./SidebarNavItem";

const pathname = vi.hoisted(() => ({ current: "/" }));
vi.mock("next/navigation", () => ({ usePathname: () => pathname.current }));

const items: NavItem[] = [
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
});
