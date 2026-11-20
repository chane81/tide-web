import { describe, expect, it } from "vitest";

import { portraitUrl } from "./portraitUrl";

describe("portraitUrl", () => {
  it("성별과 번호로 사진 주소를 만든다", () => {
    expect(portraitUrl("women", 44)).toBe("https://randomuser.me/api/portraits/women/44.jpg");
    expect(portraitUrl("men", 0)).toBe("https://randomuser.me/api/portraits/men/0.jpg");
  });

  it("0~99 범위를 넘는 번호는 100으로 나눈 나머지를 쓴다", () => {
    expect(portraitUrl("men", 132)).toBe("https://randomuser.me/api/portraits/men/32.jpg");
    expect(portraitUrl("women", -1)).toBe("https://randomuser.me/api/portraits/women/99.jpg");
  });
});
