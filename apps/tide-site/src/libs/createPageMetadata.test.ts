import { createPageMetadata } from "./createPageMetadata";

describe("createPageMetadata", () => {
  it("제목·설명을 문서와 공유 정보에 함께 넣는다", () => {
    const metadata = createPageMetadata({ title: "패키지", description: "세 패키지" });

    expect(metadata.title).toBe("패키지");
    expect(metadata.description).toBe("세 패키지");
    expect(metadata.openGraph).toEqual({
      type: "website",
      title: "패키지",
      description: "세 패키지",
      images: ["/share.jpg"],
    });
  });
});
