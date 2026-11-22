import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { createPageMetadata } from "@/libs/createPageMetadata";

import { CatalogHero } from "./_src/components/CatalogHero";
import { GroupsSection } from "./_src/components/GroupsSection";
import { PackagesSection } from "./_src/components/PackagesSection";

export const metadata = createPageMetadata({
  title: "패키지: tide components·icons·foundation",
  description:
    "tide 디자인 시스템의 npm 패키지 세 개와 Component 34종을 쓰임새 네 묶음으로 보여 줍니다.",
});

/*
  design-taste-frontend 배정: hero triptych, moment pinned-chapters(#groups). nav·footer·close·buttons·mark는 소개 페이지와 같다.
  렌더: 정적. 데이터 정책은 getPackages()·getComponentGroups()의 'use cache' + cacheLife('days')에 있다(○ Static).
*/
export default function CatalogPage() {
  return (
    <>
      <SiteNav current="/catalog" />
      <main id="top">
        <CatalogHero />
        <PackagesSection />
        <GroupsSection />
      </main>
      <SiteFooter />
    </>
  );
}
