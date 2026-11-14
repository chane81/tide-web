import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

import { AccessSection } from "./_src/components/AccessSection";
import { ComponentsSection } from "./_src/components/ComponentsSection";
import { FaqSection } from "./_src/components/FaqSection";
import { Hero } from "./_src/components/Hero";
import { InstallSection } from "./_src/components/InstallSection";
import { PrinciplesSection } from "./_src/components/PrinciplesSection";
import { ThemeSection } from "./_src/components/ThemeSection";

/*
  design-taste-frontend 배정(plan 2줄): hero centred, nav nav-centre(nav-cards가 나왔으나 사진이 없어 다시 배정),
  close close-type, footer footer-columns, rhythm surface-pairs(dark-band에서 사용자 요청으로 바꿈), buttons solid(tide Button), mark dots,
  effect 없음(배정 silk-folds → 사용자 참고 사이트에 맞춰 gradient-mesh를 시도했으나 넓은 창에서 검은 구멍이 나 tide 토큰의 정지 CSS 빛으로 바꿈), moments iris-opens(#access) · letters-assemble(#principles).
  팔레트·글꼴은 배정값 대신 tide 토큰·Pretendard(.claude/rules 8번). 바탕은 사용자가 고른 light가 기본이다.
*/
export default function Page() {
  return (
    <>
      <SiteNav />
      <main id="top">
        <Hero />
        <ComponentsSection />
        <ThemeSection />
        <AccessSection />
        <PrinciplesSection />
        <InstallSection />
        <FaqSection />
      </main>
      <SiteFooter />
    </>
  );
}
