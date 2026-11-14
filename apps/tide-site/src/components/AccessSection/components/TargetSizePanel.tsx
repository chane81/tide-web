import { Button } from "@tide-design/components";

const SIZES = [
  { size: "xs", px: "24px" },
  { size: "sm", px: "32px" },
  { size: "md", px: "40px" },
  { size: "lg", px: "48px" },
] as const;

/** 크기 견본: Button 네 크기를 실제 높이로 늘어놓는다. 가장 작은 것이 24px이다. */
export function TargetSizePanel() {
  return (
    <div className="access-panel" aria-hidden="true">
      <div className="flex flex-wrap items-end gap-3">
        {SIZES.map(({ size, px }) => (
          <span key={size} className="flex flex-col items-center gap-2">
            <Button size={size} tabIndex={-1}>
              {size}
            </Button>
            <span className="font-mono text-label-sm text-muted">{px}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
