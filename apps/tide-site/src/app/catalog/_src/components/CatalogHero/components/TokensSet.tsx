import { CollagePiece } from "./CollagePiece";
import { CountPiece } from "./CountPiece";

/** 색 Role 여섯 개. foundation README 「Role」에 적힌 이름이고, 칸 색은 tide 유틸리티(bg-*-solid)다. */
const ROLES = [
  { name: "neutral", className: "bg-neutral-solid" },
  { name: "primary", className: "bg-primary-solid" },
  { name: "success", className: "bg-success-solid" },
  { name: "warning", className: "bg-warning-solid" },
  { name: "danger", className: "bg-danger-solid" },
  { name: "info", className: "bg-info-solid" },
] as const;

/** 콜라주 셋째 벌: @tide-design/foundation 조각. Role 색 견본, 글자 크기, Token 이름. */
export function TokensSet() {
  return (
    <div className="ly-collage__set" aria-hidden="true">
      <CollagePiece x="4%" y="6%" w="54%">
        <div className="cat-swatches">
          {ROLES.map((role) => (
            <span key={role.name} className="cat-swatch">
              <i className={role.className} />
              <span className="text-label-sm">{role.name}</span>
            </span>
          ))}
        </div>
      </CollagePiece>
      <CollagePiece x="62%" y="10%" w="34%">
        <span className="flex flex-col gap-1">
          <span className="text-heading-md">Aa</span>
          <span className="text-body-sm text-muted">Pretendard</span>
        </span>
      </CollagePiece>
      <CountPiece count="Role 6개" label="색 Token" />
      <CollagePiece x="36%" y="70%" w="60%" h="26%">
        <span className="font-mono text-body-sm">--tide-bg-primary-solid</span>
      </CollagePiece>
    </div>
  );
}
