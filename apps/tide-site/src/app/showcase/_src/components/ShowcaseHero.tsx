import type { CSSProperties } from "react";

import { ButtonLink } from "@/components/ButtonLink";
import { MAIN_ACTION } from "@/constants/sections";

import { HERO_PHOTO } from "../constants/photos";

/**
 * 첫 화면(design-taste-frontend `film` 히어로): 둥근 틀 하나에 사진을 채우고, 왼쪽 아래 반대 바탕 상자에 제목·설명·버튼.
 * 영상이 없어 재생 단추는 두지 않는다(키트 「a play button with no film behind it」 금지).
 * 사진은 대역(stand-in)이다(../constants/photos.ts).
 */
export function ShowcaseHero() {
  return (
    <section className="hero hero--film" data-enter aria-labelledby="hero-h">
      <div className="wrap">
        <div className="hero-text hero__in">
          <div className="hero__media hero__fill">
            {/* 키트가 srcset·data-* 그대로의 <img>를 읽는다(layout.css .hero__media img, 검사기 data-source). */}
            {/* oxlint-disable-next-line nextjs/no-img-element */}
            <img
              src={HERO_PHOTO.src}
              srcSet={HERO_PHOTO.srcSet}
              // 폰에서는 틀이 342×724로 세로가 길어 사진 높이를 채우려면 너비의 약 3배 파일이 필요하다(검사기 photo-upscale).
              sizes="(max-width: 639px) 300vw, 100vw"
              width={1280}
              height={853}
              alt={HERO_PHOTO.alt}
              fetchPriority="high"
              decoding="async"
              data-phone-fill=""
              data-source="stand-in"
              data-subject="stand-in"
              style={{ "--ly-pos": "50% 45%", "--ly-pos-phone": "40% 50%" } as CSSProperties}
            />
            <div className="hero__over">
              <div>
                <h1 id="hero-h">화면을 만드는 팀의 React 디자인 시스템</h1>
                <p className="hero__lead">
                  종이 스케치부터 코드와 검사까지 같은 Component 이름을 씁니다. tide는 Component
                  35종과 아이콘 2,029개를 냅니다.
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
