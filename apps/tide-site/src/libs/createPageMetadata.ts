import type { Metadata } from "next";

export interface CreatePageMetadataOptions {
  /** 문서 제목(`<title>`, og:title) */
  title: string;
  /** 페이지 설명(description, og:description) */
  description: string;
}

/** 공유 이미지. 모든 페이지가 같은 그림을 쓴다. */
const SHARE_IMAGE = "/share.jpg";

/**
 * 페이지 `metadata`를 만든다. Next.js는 segment 사이에서 `openGraph`를 통째로 덮어쓰므로
 * 페이지마다 제목·설명과 함께 공유 이미지를 다시 적는다(Next.js 16.4 「Merging」).
 */
export function createPageMetadata({ title, description }: CreatePageMetadataOptions): Metadata {
  return {
    title,
    description,
    openGraph: { type: "website", title, description, images: [SHARE_IMAGE] },
  };
}
