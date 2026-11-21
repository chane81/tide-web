import type { NavItem } from "@/components/Sidebar";

import { filterCommands, flattenCommands } from "./commands";

const items: NavItem[] = [
  { href: "/", label: "개요", icon: null },
  {
    label: "분석",
    icon: null,
    children: [
      { href: "/sales", label: "매출", icon: null },
      { href: "/cards", label: "카드", icon: null },
    ],
  },
  {
    label: "고객",
    icon: null,
    children: [{ href: "/customers", label: "고객 목록", icon: null, badge: 12 }],
  },
  { href: "/settings", label: "Settings", icon: null },
];

describe("flattenCommands", () => {
  it("묶음은 빼고 하위 메뉴에 묶음 이름을 붙인다", () => {
    expect(flattenCommands(items).map(({ href, group }) => [href, group])).toEqual([
      ["/", undefined],
      ["/sales", "분석"],
      ["/cards", "분석"],
      ["/customers", "고객"],
      ["/settings", undefined],
    ]);
  });
});

describe("filterCommands", () => {
  const commands = flattenCommands(items);
  const hrefs = (query: string) => filterCommands(commands, query).map(({ href }) => href);

  it("검색어가 비면 모두 보여 준다", () => {
    expect(hrefs("  ")).toHaveLength(5);
  });

  it("이름과 묶음 이름으로 찾는다", () => {
    expect(hrefs("매출")).toEqual(["/sales"]);
    expect(hrefs("분석")).toEqual(["/sales", "/cards"]);
  });

  it("대소문자와 띄어쓰기를 보지 않는다", () => {
    expect(hrefs("SETT")).toEqual(["/settings"]);
    expect(hrefs("고객목록")).toEqual(["/customers"]);
  });

  it("분리된 한글 자모(NFD)도 찾는다", () => {
    expect(hrefs("매출".normalize("NFD"))).toEqual(["/sales"]);
  });

  it("맞는 대상이 없으면 빈 목록이다", () => {
    expect(hrefs("없는 메뉴")).toEqual([]);
  });
});
