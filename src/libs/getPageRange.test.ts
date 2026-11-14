import { getPageRange } from "./getPageRange";

describe("getPageRange", () => {
  it("페이지가 하나면 1만 보인다", () => {
    expect(getPageRange(1, 1)).toEqual([1]);
  });

  it("페이지가 적으면 모두 보인다", () => {
    expect(getPageRange(1, 3)).toEqual([1, 2, 3]);
    expect(getPageRange(3, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  it("현재 페이지에서 먼 쪽을 생략한다", () => {
    expect(getPageRange(1, 10)).toEqual([1, 2, "ellipsis", 10]);
    expect(getPageRange(10, 10)).toEqual([1, "ellipsis", 9, 10]);
  });

  it("가운데 페이지면 양쪽을 생략한다", () => {
    expect(getPageRange(5, 10)).toEqual([1, "ellipsis", 4, 5, 6, "ellipsis", 10]);
  });

  it("생략이 번호 하나만 가리면 그 번호를 보인다", () => {
    expect(getPageRange(4, 10)).toEqual([1, 2, 3, 4, 5, "ellipsis", 10]);
    expect(getPageRange(7, 10)).toEqual([1, "ellipsis", 6, 7, 8, 9, 10]);
  });
});
