import { createThemeInitScript } from "./createThemeInitScript";

const KEY = "test-theme";

function runScript(prefersDark: boolean, defaultTheme?: "light" | "dark") {
  vi.stubGlobal(
    "matchMedia",
    vi.fn<(query: string) => Pick<MediaQueryList, "matches">>(() => ({ matches: prefersDark })),
  );
  // 브라우저가 인라인 스크립트를 실행하는 것과 같게, 만든 문자열을 그대로 실행한다.
  new Function(createThemeInitScript(KEY, defaultTheme))();

  return document.documentElement.getAttribute("data-theme");
}

afterEach(() => {
  localStorage.clear();
  document.documentElement.removeAttribute("data-theme");
  vi.unstubAllGlobals();
});

describe("createThemeInitScript", () => {
  it("저장된 선택이 있으면 그 테마를 붙인다", () => {
    localStorage.setItem(KEY, "dark");

    expect(runScript(false)).toBe("dark");
  });

  it("저장된 선택이 없으면 운영체제 설정을 따른다", () => {
    expect(runScript(true)).toBe("dark");
    expect(runScript(false)).toBe("light");
  });

  it("저장값이 잘못되면 운영체제 설정을 따른다", () => {
    localStorage.setItem(KEY, "sepia");

    expect(runScript(true)).toBe("dark");
  });

  it("기본 테마를 주면 저장된 선택이 없을 때 그것을 붙인다", () => {
    expect(runScript(false, "dark")).toBe("dark");
    localStorage.setItem(KEY, "light");
    expect(runScript(true, "dark")).toBe("light");
  });
});
