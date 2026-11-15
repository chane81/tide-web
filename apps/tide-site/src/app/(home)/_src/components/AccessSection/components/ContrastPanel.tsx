/**
 * 대비 등급(tide docs/standards/accessibility.md, ADR 0023): 무엇에 몇 대 1을 지키는지.
 * 0.14.0부터 포커스 표시도 셋째 등급이다(ADR 0034): 테두리 없는 요소는 요소에 붙은 2px 링(accent border), 테두리 있는 요소는 포커스 테두리가 3:1을 맡는다.
 * 바깥 halo는 꾸밈이라 검사에서 뺀다.
 */
const TIERS = [
  { label: "정지 상태 글자", ratio: "4.5:1", sample: "text-default bg-canvas" },
  { label: "solid 위 글자, hover·누름", ratio: "4.0:1", sample: "text-on-solid bg-primary-solid" },
  { label: "테두리·아이콘·포커스 링", ratio: "3:1", sample: "border-2 border-strong bg-canvas" },
] as const;

/** 대비 견본: 등급마다 실제 tide 토큰 쌍을 칠해 보인다. */
export function ContrastPanel() {
  return (
    <ul className="access-panel">
      {TIERS.map((tier) => (
        <li key={tier.label} className="flex items-center justify-between gap-3">
          <span className="flex items-center gap-3">
            <span className={`contrast-swatch ${tier.sample}`} aria-hidden="true">
              가
            </span>
            <span className="text-body-md">{tier.label}</span>
          </span>
          <span className="font-mono text-label-md">{tier.ratio}</span>
        </li>
      ))}
    </ul>
  );
}
