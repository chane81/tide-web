import { paginate } from "./paginate";

const items = Array.from({ length: 17 }, (_, i) => i + 1);

describe("paginate", () => {
  it("페이지 크기만큼 자른다", () => {
    expect(paginate(items, 1, 8)).toEqual({
      items: [1, 2, 3, 4, 5, 6, 7, 8],
      page: 1,
      pageCount: 3,
      total: 17,
    });
  });

  it("마지막 페이지는 남은 항목만 준다", () => {
    expect(paginate(items, 3, 8).items).toEqual([17]);
  });

  it("범위를 벗어난 페이지는 첫·끝 페이지로 맞춘다", () => {
    expect(paginate(items, 0, 8).page).toBe(1);
    expect(paginate(items, 99, 8).page).toBe(3);
  });

  it("항목이 없으면 빈 첫 페이지다", () => {
    expect(paginate([], 2, 8)).toEqual({ items: [], page: 1, pageCount: 1, total: 0 });
  });
});
