import { cn } from "./cn";

describe("cn", () => {
  it("거짓 값은 빼고 조건부 class를 합친다", () => {
    expect(cn("w-full", false, undefined, null, { "h-9": true, "h-8": false })).toBe("w-full h-9");
  });

  it("Tailwind 기본 유틸리티 충돌은 뒤에 온 class가 이긴다", () => {
    expect(cn("px-3", "px-4")).toBe("px-4");
  });

  it("tide 글자색 토큰 충돌을 푼다", () => {
    expect(cn("text-muted", "text-default")).toBe("text-default");
  });

  it("tide 배경 토큰 충돌을 푼다", () => {
    expect(cn("bg-hover", "bg-active")).toBe("bg-active");
  });

  it("tide 글자 크기 토큰과 글자색 토큰은 서로 지우지 않는다", () => {
    expect(cn("text-label-md", "text-muted")).toBe("text-label-md text-muted");
  });

  it("variant가 다르면 충돌로 보지 않는다", () => {
    expect(cn("bg-hover", "hover:bg-active")).toBe("bg-hover hover:bg-active");
  });
});
