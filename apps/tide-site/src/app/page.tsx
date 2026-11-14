import { AccessSection } from "@/components/AccessSection";
import { ComponentsSection } from "@/components/ComponentsSection";
import { FaqSection } from "@/components/FaqSection";
import { Hero } from "@/components/Hero";
import { InstallSection } from "@/components/InstallSection";
import { PrinciplesSection } from "@/components/PrinciplesSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { ThemeSection } from "@/components/ThemeSection";

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
