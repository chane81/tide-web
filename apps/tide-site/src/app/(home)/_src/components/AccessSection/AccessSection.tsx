import { ContrastPanel } from "./components/ContrastPanel";
import { KeyboardPanel } from "./components/KeyboardPanel";
import { MotionPanel } from "./components/MotionPanel";
import { TargetSizePanel } from "./components/TargetSizePanel";

const CARDS = [
  {
    title: "키보드만으로 조작합니다",
    body: "react-aria 위에 만들어 Tab·화살표·Esc로 모든 Component를 다룹니다. 포커스 링은 지우지 않습니다.",
    panel: <KeyboardPanel />,
  },
  {
    title: "대비 쌍을 CI가 검사합니다",
    body: "함께 쓰는 글자·바탕 토큰 쌍을 light와 dark 모두 재고, 하나라도 기준에 못 미치면 빌드가 실패합니다.",
    panel: <ContrastPanel />,
  },
  {
    title: "누를 곳은 24px보다 작지 않습니다",
    body: "가장 작은 Button과 아이콘 버튼도 24×24px입니다. 간격 예외에 기대지 않고 크기로 맞춥니다.",
    panel: <TargetSizePanel />,
  },
  {
    title: "움직임 줄이기 설정을 따릅니다",
    body: "prefers-reduced-motion이 켜지면 장식 모션을 끕니다. 상태는 움직임이 아니라 글자와 모양으로 보입니다.",
    panel: <MotionPanel />,
  },
] as const;

/**
 * 4·5번 화면: 접근성 네 가지(features-2x2, 두 화면). 한 단계 다른 바탕의 띠(surface-pairs, `ground-surface`)이고,
 * 들어올 때 앞 구역 바탕(base)에서 원이 열리며 띠 바탕이 드러난다(moment iris-opens, from base).
 * 띠 안 카드는 키트가 `--card`를 페이지 바탕(canvas)으로 돌려 회색 띠 위 흰 카드로 보인다.
 */
export function AccessSection() {
  return (
    <section
      className="section g2 ground-surface"
      id="access"
      aria-labelledby="access-h"
      data-moment="iris-opens"
      data-moment-opts='{"from": "base"}'
    >
      <div className="wrap">
        <div className="group">
          <div className="section-head">
            <h2 id="access-h">
              키보드와 대비를 먼저 검사합니다.{" "}
              <span className="muted">WCAG 2.2 AA가 최소 기준입니다.</span>
            </h2>
          </div>
          <div className="grid">
            {CARDS.slice(0, 2).map((card) => (
              <article key={card.title} className="card card--row span-6">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
                <div className="panel panel--flush">{card.panel}</div>
              </article>
            ))}
          </div>
        </div>
        <div className="grid">
          {CARDS.slice(2).map((card) => (
            <article key={card.title} className="card card--row span-6">
              <h3>{card.title}</h3>
              <p>{card.body}</p>
              <div className="panel panel--flush">{card.panel}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
