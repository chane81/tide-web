import { getDeckPositions } from "./getDeckPositions";

describe("getDeckPositions", () => {
  it("고른 카드를 맨 앞(0)에 두고 나머지는 원래 순서대로 뒤에 둔다", () => {
    const positions = getDeckPositions(["a", "b", "c"], "b");

    expect([...positions]).toEqual([
      ["b", 0],
      ["a", 1],
      ["c", 2],
    ]);
  });

  it("고른 카드가 목록에 없으면 원래 순서 그대로다", () => {
    expect([...getDeckPositions(["a", "b"], "x")]).toEqual([
      ["a", 0],
      ["b", 1],
    ]);
  });
});
