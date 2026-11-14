/** Role 여섯 개의 solid 색. 칸 색은 tide 유틸리티(bg-*-solid)다. */
const ROLES = [
  "bg-neutral-solid",
  "bg-primary-solid",
  "bg-success-solid",
  "bg-warning-solid",
  "bg-danger-solid",
  "bg-info-solid",
] as const;

/** foundation 카드 그림: Role 색 Token 견본 */
export function TokensVisual() {
  return (
    <div className="cat-swatches cat-swatches--row w-full">
      {ROLES.map((className) => (
        <span key={className} className="cat-swatch">
          <i className={className} />
        </span>
      ))}
    </div>
  );
}
