import { getComponentGroups } from "./componentGroups.api";

// cacheLife는 Next 렌더 밖에서 부를 수 없어 테스트에서는 아무것도 하지 않게 한다.
vi.mock("next/cache", () => ({ cacheLife: () => {} }));

describe("getComponentGroups", () => {
  it("네 묶음이 Component 34종을 한 번씩 담는다", async () => {
    const { groups } = await getComponentGroups();
    const names = groups.flatMap((group) => group.components);

    expect(groups).toHaveLength(4);
    expect(names).toHaveLength(34);
    expect(new Set(names).size).toBe(34);
  });

  it("묶음 제목의 개수가 실제 Component 수와 같다", async () => {
    const { groups } = await getComponentGroups();

    for (const group of groups) {
      expect(group.title).toContain(`${group.components.length}종`);
    }
  });
});
