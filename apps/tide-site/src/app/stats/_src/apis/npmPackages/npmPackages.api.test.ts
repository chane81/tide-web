import { getNpmPackages } from "./npmPackages.api";

// connection()은 Next 요청 밖에서 부를 수 없어 테스트에서는 바로 끝나게 한다.
vi.mock("next/server", () => ({ connection: async () => {} }));

const json = (body: unknown, ok = true) => ({ ok, json: async () => body }) as Response;

describe("getNpmPackages", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("패키지마다 registry 버전과 지난 7일 다운로드 수를 읽는다", async () => {
    const fetchMock = vi.fn<(url: string) => Promise<Response>>(async (url) =>
      url.includes("registry.npmjs.org")
        ? json({ version: "0.11.5" })
        : json({ downloads: 871, start: "2026-11-07", end: "2026-11-13" }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const result = await getNpmPackages();

    expect(fetchMock).toHaveBeenCalledWith(
      "https://registry.npmjs.org/@tide-design/components/latest",
    );
    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.npmjs.org/downloads/point/last-week/@tide-design/icons",
    );
    expect(result?.packages).toHaveLength(3);
    expect(result?.packages[0]).toEqual({
      name: "@tide-design/components",
      version: "0.11.5",
      downloads: 871,
      start: "2026-11-07",
      end: "2026-11-13",
    });
  });

  it("한 API만 실패하면 그 값만 비운다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn<(url: string) => Promise<Response>>(async (url) =>
        url.includes("registry.npmjs.org") ? json({}, false) : json({ downloads: 10 }),
      ),
    );

    const result = await getNpmPackages();

    expect(result?.packages[0]).toMatchObject({ version: null, downloads: 10 });
  });

  it("모두 실패하면 null을 돌려준다", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn<() => Promise<Response>>(async () => {
        throw new Error("offline");
      }),
    );

    expect(await getNpmPackages()).toBeNull();
  });
});
