import { Badge } from "@tide-design/components";
import { MinusIcon, TrendingDownIcon, TrendingUpIcon } from "@tide-design/icons";

import { formatPercent } from "@/libs/formatPercent";
import { getChange } from "@/libs/getChange";

export interface ChangeBadgeProps {
  current: number;
  previous: number;
}

const COLOR = { up: "success", down: "danger", flat: "neutral" } as const;
const ICON = { up: <TrendingUpIcon />, down: <TrendingDownIcon />, flat: <MinusIcon /> };
const WORD = { up: "증가", down: "감소", flat: "변화 없음" };

/** 증감률 배지. 증가는 success, 감소는 danger. 색만으로 뜻을 전하지 않도록 부호와 숨김 글자를 함께 둔다. */
export function ChangeBadge({ current, previous }: ChangeBadgeProps) {
  const { rate, direction } = getChange(current, previous);

  return (
    <Badge color={COLOR[direction]} size="sm" className="gap-1">
      {ICON[direction]}
      <span className="sr-only">{WORD[direction]}</span>
      {rate === null ? "—" : formatPercent(rate, { signed: true })}
    </Badge>
  );
}
