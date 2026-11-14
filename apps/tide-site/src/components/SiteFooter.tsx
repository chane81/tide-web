/* oxlint-disable nextjs/no-html-link-for-pages -- 페이지 사이 이동은 <a>로 새로 읽는다. 키트 스크립트(system.js·moments)가 페이지를 처음 읽을 때 한 번만 붙어서, next/link 클라이언트 이동이면 새 페이지의 moment·효과가 붙지 않는다. */
import { ArrowRightIcon } from "@tide-design/icons";
import type { ReactNode } from "react";

import { ButtonLink } from "@/components/ButtonLink";
import { NPM_URL, STORYBOOK_URL } from "@/constants/links";
import { SITE_PAGES } from "@/constants/pages";
import { MAIN_ACTION, SECTIONS } from "@/constants/sections";

export interface SiteFooterProps {
  /** 사진 출처 한 줄(`/credits`로 가는 링크). 사진을 쓰는 페이지만 넘긴다. */
  credits?: ReactNode;
}

/** 마지막 화면: 마무리(close-type)와 푸터(footer-columns). 큰 버튼이 주 행동을 한 번 더 묻는다. */
export function SiteFooter({ credits }: SiteFooterProps) {
  return (
    <footer className="footer closing" id="contact" aria-labelledby="close-h">
      <div className="wrap">
        <div className="closing__cta close--type">
          <div className="section-head">
            <h2 id="close-h">tide를 Next.js 앱에 설치</h2>
            <p>React 19와 Tailwind CSS 4.3 이상이면 명령 한 줄과 CSS 두 줄로 시작합니다.</p>
          </div>
          {/* 키트 close-type의 큰 버튼처럼 화살표를 단다. */}
          <ButtonLink
            size="lg"
            className="close-button"
            endIcon={<ArrowRightIcon />}
            href={MAIN_ACTION.href}
          >
            {MAIN_ACTION.label}
          </ButtonLink>
        </div>
        <div className="closing__links">
          <div className="grid">
            {/* 열 네 칸(span-6 + span-2 × 3)이 12칸을 채워 오른쪽 선에서 끝난다. */}
            <div className="span-6 stack-4">
              <a className="nav__logo" href="/">
                <span className="mark" data-mark="dots" aria-hidden="true" />
                tide
              </a>
              <p className="footer__lede">Component, 아이콘, 토큰을 한 버전으로 냅니다.</p>
            </div>
            <div className="span-2 footer__col">
              <h3>페이지</h3>
              <ul>
                {SITE_PAGES.map((page) => (
                  <li key={page.href}>
                    <a href={page.href}>{page.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>소개 구역</h3>
              <ul>
                {SECTIONS.map((s) => (
                  <li key={s.id}>
                    <a href={`/#${s.id}`}>{s.label}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="span-2 footer__col">
              <h3>문서</h3>
              <ul>
                <li>
                  <a href={STORYBOOK_URL}>Storybook</a>
                </li>
                <li>
                  <a href={NPM_URL}>npm</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer__legal">
            <span>© 2026 tide · MIT 라이선스</span>
            <div className="socials" />
            {credits}
          </div>
        </div>
      </div>
    </footer>
  );
}
