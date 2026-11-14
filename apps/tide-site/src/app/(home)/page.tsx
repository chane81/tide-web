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
  close close-type, footer footer-columns, rhythm dark-band, buttons solid(tide Button), mark dots,
  effect silk-folds(히어로 창 바탕), moments iris-opens(#access) · letters-assemble(#principles).
  팔레트·글꼴은 배정값 대신 tide 토큰·Pretendard(.claude/rules 8번).
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
