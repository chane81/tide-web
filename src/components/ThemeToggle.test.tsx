import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { THEME_STORAGE_KEY } from "@/constants/theme";

import { ThemeToggle } from "./ThemeToggle";

function stubPrefersDark(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn<(query: string) => Pick<MediaQueryList, "matches">>(() => ({ matches })),
  );
}

const html = () => document.documentElement;

afterEach(() => {
  localStorage.clear();
  html().removeAttribute("data-theme");
  vi.unstubAllGlobals();
});

describe("ThemeToggle", () => {
  it("누르면 <html>의 data-theme이 바뀌고 선택이 저장된다", async () => {
    stubPrefersDark(false);
    const user = userEvent.setup();
    render(<ThemeToggle />);

    const toggle = screen.getByRole("switch", { name: "다크 테마" });
    expect(toggle).not.toBeChecked();

    await user.click(toggle);
    expect(html()).toHaveAttribute("data-theme", "dark");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("dark");
    expect(toggle).toBeChecked();

    await user.click(toggle);
    expect(html()).toHaveAttribute("data-theme", "light");
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe("light");
    expect(toggle).not.toBeChecked();
  });

  it("저장된 선택이 없으면 운영체제 설정(dark)을 따른다", () => {
    stubPrefersDark(true);
    render(<ThemeToggle />);

    expect(html()).toHaveAttribute("data-theme", "dark");
    expect(screen.getByRole("switch", { name: "다크 테마" })).toBeChecked();
  });

  it("저장된 선택이 운영체제 설정보다 우선한다", () => {
    stubPrefersDark(true);
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    render(<ThemeToggle />);

    expect(html()).toHaveAttribute("data-theme", "light");
    expect(screen.getByRole("switch", { name: "다크 테마" })).not.toBeChecked();
  });
});
