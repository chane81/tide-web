import { createInverseThemeScript } from "./createInverseThemeScript";

afterEach(() => {
  document.documentElement.removeAttribute("data-theme");
  document.body.innerHTML = "";
});

/** 구역 안 script에서 실행하는 것처럼 currentScript를 흉내 낸다. */
function runInside(section: HTMLElement) {
  const script = document.createElement("script");
  section.append(script);
  Object.defineProperty(document, "currentScript", { value: script, configurable: true });
  new Function(createInverseThemeScript())();
}

describe("createInverseThemeScript", () => {
  it("페이지가 dark면 구역을 light로, light면 dark로 둔다", () => {
    const section = document.createElement("section");
    section.setAttribute("data-inverse-theme", "");
    document.body.append(section);

    document.documentElement.setAttribute("data-theme", "dark");
    runInside(section);
    expect(section).toHaveAttribute("data-theme", "light");

    document.documentElement.setAttribute("data-theme", "light");
    runInside(section);
    expect(section).toHaveAttribute("data-theme", "dark");
  });
});
