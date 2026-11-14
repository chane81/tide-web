import { validateProfile } from "./validateProfile";

describe("validateProfile", () => {
  it("올바르면 빈 객체다", () => {
    expect(validateProfile({ name: "김하늘", email: "a@b.co" })).toEqual({});
  });

  it("이름이 비었거나 공백뿐이면 오류다", () => {
    expect(validateProfile({ name: "  ", email: "a@b.co" })).toEqual({
      name: "이름을 입력하세요.",
    });
  });

  it("이메일이 비면 입력하라고, 형식이 틀리면 형식 오류를 준다", () => {
    expect(validateProfile({ name: "a", email: "" }).email).toBe("이메일을 입력하세요.");
    for (const email of ["a", "a@b", "a b@c.d", "@b.co"]) {
      expect(validateProfile({ name: "a", email }).email).toMatch(/형식/);
    }
  });

  it("앞뒤 공백은 무시한다", () => {
    expect(validateProfile({ name: "a", email: " a@b.co " })).toEqual({});
  });
});
