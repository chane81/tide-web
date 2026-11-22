import { AccessSection } from "./_src/components/AccessSection";
import { ComponentsSection } from "./_src/components/ComponentsSection";
import { FaqSection } from "./_src/components/FaqSection";
import { Hero } from "./_src/components/Hero";
import { InstallSection } from "./_src/components/InstallSection";
import { PrinciplesSection } from "./_src/components/PrinciplesSection";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { ThemeSection } from "./_src/components/ThemeSection";
import { createPageMetadata } from "@/libs/createPageMetadata";

export const metadata = createPageMetadata({
  title: "tide: Next.js 앱을 위한 React 디자인 시스템",
  description:
    "Component 34종과 아이콘 2,029개를 토큰 하나로 칠하고, light·dark 대비를 WCAG 2.2 AA로 검사하는 React 디자인 시스템입니다.",
});

/*
  design-taste-frontend 배정(plan 2줄): hero centred, nav nav-centre(nav-cards가 나왔으나 사진이 없어 다시 배정),
  close close-type, footer footer-columns, rhythm surface-pairs(dark-band에서 사용자 요청으로 바꿈), buttons solid(tide Button), mark dots,
  effect 없음(배정 silk-folds → 사용자 참고 사이트에 맞춰 gradient-mesh를 시도했으나 넓은 창에서 검은 구멍이 나 tide 토큰의 정지 CSS 빛으로 바꿈), moments iris-opens(#access) · letters-assemble(#principles).
  팔레트·글꼴은 배정값 대신 tide 토큰·Pretendard(.claude/rules 8번). 바탕은 사용자가 고른 light가 기본이다.
  렌더: 요청 데이터가 없어 기본 프리렌더(정적)로 둔다.
*/
export default function Page() {
  return (
    <>
      <SiteNav current="/" />
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
