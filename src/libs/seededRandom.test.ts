import { seededRandom } from "./seededRandom";

describe("seededRandom", () => {
  it("같은 시드면 같은 수열을 준다", () => {
    const a = seededRandom(42);
    const b = seededRandom(42);

    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });

  it("시드가 다르면 다른 수열을 주고, 값은 0 이상 1 미만이다", () => {
    const a = seededRandom(1);
    const b = seededRandom(2);
    const values = Array.from({ length: 100 }, a);

    expect(a()).not.toBe(b());
    expect(values.every((v) => v >= 0 && v < 1)).toBe(true);
  });
});
