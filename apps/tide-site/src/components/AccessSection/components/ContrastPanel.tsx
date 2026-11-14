/** 대비 등급(tide docs/standards/accessibility.md, ADR 0023): 무엇에 몇 대 1을 지키는지 */
const TIERS = [
  { label: "정지 상태 글자", ratio: "4.5:1", sample: "text-default bg-canvas" },
  { label: "solid 위 글자, hover·누름", ratio: "4.0:1", sample: "text-on-solid bg-primary-solid" },
  { label: "입력 테두리·포커스 표시", ratio: "3:1", sample: "border-2 border-strong bg-canvas" },
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
