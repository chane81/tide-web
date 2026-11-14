import { customerFixture as c } from "./customerFixture";
import { sortCustomers } from "./sortCustomers";

const items = [
  c({ id: "1", name: "박서준", joinedAt: "2026-03-01T00:00:00.000Z", totalSpent: 300 }),
  c({ id: "2", name: "김서연", joinedAt: "2026-01-01T00:00:00.000Z", totalSpent: 100 }),
  c({ id: "3", name: "이도윤", joinedAt: "2026-02-01T00:00:00.000Z", totalSpent: 100 }),
];

const ids = (list: { id: string }[]) => list.map((x) => x.id);

describe("sortCustomers", () => {
  it("이름을 가나다순·역순으로 정렬한다", () => {
    expect(ids(sortCustomers(items, { key: "name", direction: "asc" }))).toEqual(["2", "1", "3"]);
    expect(ids(sortCustomers(items, { key: "name", direction: "desc" }))).toEqual(["3", "1", "2"]);
  });

  it("가입일로 정렬한다", () => {
    expect(ids(sortCustomers(items, { key: "joinedAt", direction: "asc" }))).toEqual([
      "2",
      "3",
      "1",
    ]);
  });

  it("값이 같으면 원래 순서를 지킨다", () => {
    expect(ids(sortCustomers(items, { key: "totalSpent", direction: "asc" }))).toEqual([
      "2",
      "3",
      "1",
    ]);
  });

  it("원래 배열은 바꾸지 않는다", () => {
    sortCustomers(items, { key: "name", direction: "asc" });
    expect(ids(items)).toEqual(["1", "2", "3"]);
  });
});
