import { getTidePackage } from "./tidePackage.api";

// cacheLife는 Next 렌더 밖에서 부를 수 없어 테스트에서는 아무것도 하지 않게 한다.
vi.mock("next/cache", () => ({ cacheLife: () => {} }));

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("getTidePackage", () => {
  it("npm registry 응답에서 이름과 최신 버전을 돌려준다", async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(Response.json({ version: "1.2.3" }));
    vi.stubGlobal("fetch", fetchMock);

    await expect(getTidePackage()).resolves.toEqual({
      name: "@tide-design/components",
      version: "1.2.3",
    });
    expect(fetchMock).toHaveBeenCalledWith(
      "https://registry.npmjs.org/@tide-design/components/latest",
    );
  });

  it("응답이 실패하면 null을 돌려준다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn<typeof fetch>().mockResolvedValue(new Response(null, { status: 503 })),
    );

    await expect(getTidePackage()).resolves.toBeNull();
  });

  it("네트워크 오류면 null을 돌려준다", async () => {
    vi.stubGlobal("fetch", vi.fn<typeof fetch>().mockRejectedValue(new TypeError("fetch failed")));

    await expect(getTidePackage()).resolves.toBeNull();
  });
});
