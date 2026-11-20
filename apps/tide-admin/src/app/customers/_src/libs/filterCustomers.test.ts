import { customerFixture as c } from "./customerFixture";
import { filterCustomers } from "./filterCustomers";

const items = [
  c({ id: "1", name: "김서연", email: "seoyeon.kim@example.com", status: "active" }),
  c({ id: "2", name: "이도윤", email: "doyun.lee@example.com", status: "dormant" }),
  c({ id: "3", name: "박서준", email: "Seojun.PARK@example.com", status: "churned" }),
];

const ids = (list: { id: string }[]) => list.map((x) => x.id);

describe("filterCustomers", () => {
  it("조건이 없으면 모두 준다", () => {
    expect(ids(filterCustomers(items, { query: "", status: "all" }))).toEqual(["1", "2", "3"]);
  });

  it("이름으로 찾는다", () => {
    expect(ids(filterCustomers(items, { query: "서", status: "all" }))).toEqual(["1", "3"]);
  });

  it("이메일은 대소문자를 가리지 않고, 앞뒤 공백은 무시한다", () => {
    expect(ids(filterCustomers(items, { query: "  park ", status: "all" }))).toEqual(["3"]);
  });

  it("상태로 거르고 검색어와 함께 쓴다", () => {
    expect(ids(filterCustomers(items, { query: "", status: "dormant" }))).toEqual(["2"]);
    expect(ids(filterCustomers(items, { query: "서", status: "active" }))).toEqual(["1"]);
  });

  it("맞는 고객이 없으면 빈 목록이다", () => {
    expect(filterCustomers(items, { query: "없음", status: "all" })).toEqual([]);
  });
});
