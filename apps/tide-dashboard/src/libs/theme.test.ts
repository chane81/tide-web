import { isTheme, resolveTheme } from "./theme";

describe("isTheme", () => {
  it("light·dark만 테마로 본다", () => {
    expect(isTheme("light")).toBe(true);
    expect(isTheme("dark")).toBe(true);
    expect(isTheme("sepia")).toBe(false);
    expect(isTheme(null)).toBe(false);
  });
});

describe("resolveTheme", () => {
  it("저장된 선택이 운영체제 설정보다 우선한다", () => {
    expect(resolveTheme("light", true)).toBe("light");
    expect(resolveTheme("dark", false)).toBe("dark");
  });

  it("저장된 선택이 없거나 잘못되면 운영체제 설정을 따른다", () => {
    expect(resolveTheme(null, true)).toBe("dark");
    expect(resolveTheme(null, false)).toBe("light");
    expect(resolveTheme("sepia", true)).toBe("dark");
  });
});
