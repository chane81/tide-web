import { ButtonLink } from "@/components/ButtonLink";
import { NPM_URL, STORYBOOK_URL } from "@/constants/links";
import { MAIN_ACTION } from "@/constants/sections";

import { HeroOverCard } from "./components/HeroOverCard";
import { HeroWindow } from "./components/HeroWindow";

/**
 * 첫 화면(design-taste-frontend `centred` 히어로): 버전 알림, 가운데 제목, 설명, 버튼 둘, 그 아래 tide로 그린 대시보드 창.
 * 창은 옅은 파랑~하늘색 빛 바탕(사용자가 고른 참고 사이트 느낌, tide primary·info 토큰의 정지 CSS, globals.css `.hero__window`) 위에 놓이고 아래 18%가 바탕으로 흐려진다(키트 layout.css).
 */
export function Hero() {
  return (
    <section className="hero hero--centred" data-enter aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-text">
          <div className="hero__c">
            <a className="pill" href={NPM_URL}>
              <span>0.15.0</span>
              <span className="muted">npm에 배포된 버전 보기</span>
            </a>
            <h1 id="hero-h">
              <span className="mark hero-mark" data-mark="dots" aria-hidden="true" /> Next.js 앱을
              위한 React 디자인 시스템
            </h1>
            <p className="hero__lead">
              버튼부터 표·대화상자까지 Component 34종과 아이콘 2,029개를 tide 토큰으로 칠합니다.
              light·dark 대비는 WCAG 2.2 AA 기준으로 CI가 검사합니다.
            </p>
            <div className="btn-row">
              <ButtonLink size="lg" href={MAIN_ACTION.href}>
                {MAIN_ACTION.label}
              </ButtonLink>
              <ButtonLink size="lg" variant="outline" color="neutral" href={STORYBOOK_URL}>
                Storybook 문서 보기
              </ButtonLink>
            </div>
          </div>
          <div
            className="hero__window"
            // 실제 tide Component를 모은 창이라 <img>로 바꿀 수 없다. 창 전체를 그림 하나로 알린다.
            // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
            role="img"
            aria-label="tide Component로 그린 대시보드의 고객 화면: 지표 카드 세 장과 고객 표"
          >
            <HeroWindow />
            <HeroOverCard />
          </div>
        </div>
      </div>
    </section>
  );
}
