import { STORYBOOK_URL } from "@/constants/links";

import { ThemeDemo } from "./components/ThemeDemo";

/** 3번 화면: data-theme 한 줄로 바뀌는 테마(split-text-left). 오른쪽 스위치가 이 페이지 테마를 실제로 바꾼다. */
export function ThemeSection() {
  return (
    <section className="section" id="theme" aria-labelledby="theme-h">
      <div className="wrap">
        <div className="grid">
          <div className="span-5 stack-5">
            <h2 id="theme-h">data-theme 한 줄로 바뀌는 tide 테마</h2>
            <p className="t-lead">
              {"<html>"}에 data-theme=&quot;dark&quot;를 붙이면 Component 이름은 그대로 두고
              참조하는 색만 바뀝니다. 브랜드 색은 tide-color CLI로 만들어 Role로 더합니다.
            </p>
            <ul className="facts">
              <li>Role 여섯 개: neutral, primary, success, warning, danger, info</li>
              <li>Component 코드에는 hex가 없습니다</li>
              <li>운영체제 다크 모드는 읽지 않습니다. 따를지는 앱이 정합니다</li>
            </ul>
            <a className="link" href={STORYBOOK_URL}>
              색과 테마 문서 보기
            </a>
          </div>
          <div className="frame frame--split span-6 start-7">
            <ThemeDemo />
          </div>
        </div>
      </div>
    </section>
  );
}
