import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { createPageMetadata } from "@/libs/createPageMetadata";

import { PHOTO_CREDITS } from "./_src/constants/photoCredits";

export const metadata = createPageMetadata({
  title: "사진 출처: tide 소개 사이트",
  description: "tide 소개 사이트에 쓴 사진의 촬영자, 라이선스, Wikimedia Commons 원본 주소입니다.",
});

/*
  사진 출처 목록(스킬 copy.md 「Credits」: 푸터에는 한 줄만, 목록은 따로 둔 페이지에). /showcase 푸터의 한 줄이 여기로 온다.
  렌더: 기본 프리렌더(○ Static).
*/
export default function CreditsPage() {
  return (
    <>
      <SiteNav />
      <main id="top">
        <section className="section" aria-labelledby="credits-h">
          <div className="wrap stack-6">
            <h1 id="credits-h">사진 출처</h1>
            <ul className="stack-4">
              {PHOTO_CREDITS.map((credit) => (
                <li key={credit.page}>
                  {credit.by}, <a href={credit.licenceUrl}>{credit.licence}</a>,{" "}
                  <a href={credit.page}>Wikimedia Commons 원본</a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
