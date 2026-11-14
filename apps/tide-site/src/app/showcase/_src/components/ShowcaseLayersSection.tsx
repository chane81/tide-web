/**
 * 3번 화면: 큰 문장 하나(moment word-highlight, 화면 가운데를 지날 때 단어가 하나씩 진해진다).
 * 문장은 tide README 「세 층」 그대로다.
 */
export function ShowcaseLayersSection() {
  return (
    <section
      className="section statement"
      id="layers"
      data-moment="word-highlight"
      aria-labelledby="layers-h"
    >
      <div className="wrap">
        <h2 id="layers-h" className="t-label">
          tide의 세 층
        </h2>
        <p className="mo-wh__text">
          원칙이 기준을 정하고, 기준을 통과한 값만 Token이 되며,{" "}
          <strong>Component는 Token만</strong> 씁니다. 그래서 스케치에 적은 이름이 화면의 색과
          간격까지 이어집니다.
        </p>
      </div>
    </section>
  );
}
