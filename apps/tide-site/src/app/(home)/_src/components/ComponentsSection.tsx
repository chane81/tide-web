import { STORYBOOK_URL } from "@/constants/links";

import { ComponentsFrame } from "./ComponentsFrame";

/** 2번 화면: Component를 한 창에서 고르고 실제로 그려 본다(app-frame). */
export function ComponentsSection() {
  return (
    <section className="section" id="components" aria-labelledby="components-h">
      <div className="wrap">
        <div className="grid">
          <h2 id="components-h" className="span-5">
            Component 34종을 한 창에서 고릅니다
          </h2>
          <div className="span-6 start-7 stack-4">
            <p className="muted">
              왼쪽 목록에서 Component를 고르면 오른쪽에 tide Component가 그대로 그려집니다.
              크기·색·상태를 비교하고 import 한 줄을 옮기면 됩니다.
            </p>
            <a className="link" href={STORYBOOK_URL}>
              Storybook에서 34종 모두 보기
            </a>
          </div>
        </div>
        <ComponentsFrame />
      </div>
    </section>
  );
}
