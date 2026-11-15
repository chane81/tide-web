import { Suspense } from "react";

import { ButtonLink } from "@/components/ButtonLink";
import { NPM_URL } from "@/constants/links";
import { MAIN_ACTION } from "@/constants/sections";

import { StatsWindow } from "./StatsWindow";
import { StatsWindowFallback } from "./StatsWindowFallback";

/**
 * 첫 화면(design-taste-frontend `collage` 히어로): 왼쪽 글, 오른쪽 밝힌 바탕 위에 npm 현황 창과 합계 카드.
 * 창 안만 요청마다 그린다: 글과 틀은 프리렌더 셸에 들어가고, 창은 `<Suspense>` fallback(tide Skeleton) 뒤에서 스트리밍된다.
 * `data-ui`: 키트·검사기가 읽는 「제품 UI 조각」 표시(값이 비어 키트가 자기 조각을 그려 넣지 않는다).
 */
export function StatsHero() {
  return (
    <section className="hero hero--collage" data-enter aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-text grid hero__grid">
          <div className="hero__text span-5">
            <h1 id="hero-h">React 디자인 시스템 tide의 npm 다운로드 현황</h1>
            <p className="hero__lead">
              components, icons, foundation의 최신 버전과 지난 7일 다운로드 수를 이 페이지를 열
              때마다 npm 공개 API에서 새로 읽습니다.
            </p>
            <div className="btn-row">
              <ButtonLink size="lg" href={MAIN_ACTION.href}>
                {MAIN_ACTION.label}
              </ButtonLink>
              <ButtonLink size="lg" variant="outline" color="neutral" href={NPM_URL}>
                npm 패키지 보기
              </ButtonLink>
            </div>
          </div>
          <div className="hero__art span-6 start-7" data-ui="">
            <Suspense fallback={<StatsWindowFallback />}>
              <StatsWindow />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
