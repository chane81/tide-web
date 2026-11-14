/** tide 원칙(README). 번호가 곧 우선순위다. */
const PRINCIPLES = [
  { ko: "접근성이 미려함보다 우선한다", en: "Accessible over beautiful" },
  { ko: "명확함이 화려함보다 우선한다", en: "Clarity over flair" },
  { ko: "단순함이 유연함보다 우선한다", en: "Simple over flexible" },
  { ko: "발견할 수 있음이 외워야 함보다 우선한다", en: "Discoverable over memorized" },
] as const;

/**
 * 6번 화면: 첫째 원칙을 크게 세운다(moment letters-assemble). 글자가 흩어졌다가 줄로 모인다.
 * `statement`: 키트가 statement moment의 구역에 붙이는 class(moments/_demo/in-page.html). 키트에 이 class의 스타일은 없다.
 */
export function PrinciplesSection() {
  return (
    <section
      className="section statement"
      id="principles"
      aria-labelledby="principles-h"
      data-moment="letters-assemble"
      data-moment-opts='{"spread": 0.8}'
    >
      <div className="wrap stack-7">
        <h2 id="principles-h" className="mo-la__type">
          접근성이 미려함보다 우선한다
        </h2>
        <p className="mo-la__sub t-lead muted">
          tide 원칙 네 개 중 첫째입니다. 원칙끼리 부딪히면 번호가 작은 쪽을 따릅니다.
        </p>
        <ol className="principles">
          {PRINCIPLES.map((p, i) => (
            <li key={p.en}>
              <span className="font-mono text-label-md text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="text-body-lg">{p.ko}</span>
              <span className="text-body-sm text-muted">{p.en}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
