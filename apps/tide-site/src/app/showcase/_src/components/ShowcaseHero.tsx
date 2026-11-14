import { Field, Input } from "@tide-design/components";
import { MailIcon } from "@tide-design/icons";

import { ButtonLink } from "@/components/ButtonLink";
import { MAIN_ACTION } from "@/constants/sections";

import { GlowDecor } from "./GlowDecor";
import { SceneCard } from "./SceneCard";

/**
 * 첫 화면(design-taste-frontend `centred` 히어로, 사진이 빠져 film 대신 다시 배정): 가운데 제목과 버튼,
 * 그 아래 빛 번짐 판(키트 .hero__window) 위에 뜬 흰 카드. 카드 안은 실제 tide Field·Input이다(소개 페이지 히어로 창처럼 그림으로 알리고 inert로 포커스를 막는다). 카드 발(출처 라벨)이 틀 아래 흐림(82%부터) 위에서 끝나게 짧게 둔다.
 */
export function ShowcaseHero() {
  return (
    <section className="hero hero--centred" data-enter aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-text">
          <div className="hero__c">
            <h1 id="hero-h">화면 조각으로 보는 React 디자인 시스템</h1>
            <p className="hero__lead">
              tide Component로 그린 화면 조각과 tide가 지키는 기준을 카드 한 장씩 모았습니다.
              Component는 35종이고, 대비는 WCAG 2.2 AA로 검사합니다.
            </p>
            <div className="btn-row">
              <ButtonLink size="lg" href={MAIN_ACTION.href}>
                {MAIN_ACTION.label}
              </ButtonLink>
              <ButtonLink size="lg" variant="outline" color="neutral" href="/catalog">
                패키지 목록 보기
              </ButtonLink>
            </div>
          </div>
          <div
            className="hero__window"
            // 빛 바탕 위의 카드 한 장이 그림이다. 카드 안 tide Field는 누를 수 없는 견본(inert)이라 창 전체를 그림 하나로 알린다.
            // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role
            role="img"
            aria-label="빛 번짐 바탕 위에 뜬 흰 카드: tide Field로 그린 메일 주소 입력 칸"
          >
            <GlowDecor />
            <div className="scene-float" inert>
              <SceneCard
                as="p"
                title="입력 칸의 이름·설명·오류를 Field가 잇습니다"
                source="@tide-design/components · Field"
                note="label, 설명, 오류 문구, required를 입력에 연결"
              >
                <span className="scene-card__icon">
                  <MailIcon size={20} aria-hidden="true" />
                </span>
                <Field label="받을 메일 주소" description="알림을 받을 주소입니다.">
                  <Input defaultValue="haneul.kim@example.com" />
                </Field>
              </SceneCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
