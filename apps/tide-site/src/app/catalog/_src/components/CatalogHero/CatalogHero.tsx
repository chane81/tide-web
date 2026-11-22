import { ButtonLink } from "@/components/ButtonLink";
import { MAIN_ACTION } from "@/constants/sections";

import { ComponentsSet } from "./components/ComponentsSet";
import { IconsSet } from "./components/IconsSet";
import { TokensSet } from "./components/TokensSet";

/**
 * 첫 화면(design-taste-frontend `triptych` 히어로): 왼쪽 제목, 가운데 tide 조각 콜라주, 오른쪽 큰 버튼 하나.
 * 콜라주는 패키지마다 한 벌(components·icons·foundation)이고, 키트 layout.js가 2.8초마다 바꾸며 멈춤 단추를 단다.
 * 조각은 실제 tide Component지만 누를 수 없는 견본이라 콜라주 전체를 그림 하나로 알린다.
 */
export function CatalogHero() {
  return (
    <section className="hero hero--triptych" data-enter aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-text grid hero__grid">
          <div className="span-3">
            <h1 id="hero-h">React 디자인 시스템 tide, 패키지 세 개</h1>
            <p className="hero__lead">
              tide는 Component 34종, 아이콘 2,029개, Token을 세 npm 패키지로 나눠 냅니다. MIT
              라이선스입니다.
            </p>
          </div>
          <div
            className="ly-collage span-6 start-4"
            // 실제 tide Component 조각을 모은 견본이라 <img>로 바꿀 수 없다. 콜라주 전체를 그림 하나로 알린다.
            // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
            role="img"
            aria-label="tide 패키지 세 개의 조각: Component 카드와 배지, 아이콘 묶음, 색 Token 견본"
            data-ui=""
          >
            <ComponentsSet />
            <IconsSet />
            <TokensSet />
          </div>
          <div className="span-3 start-10 hero__cta">
            <ButtonLink size="lg" href={MAIN_ACTION.href}>
              {MAIN_ACTION.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
