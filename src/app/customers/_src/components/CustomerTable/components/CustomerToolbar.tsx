import { Input, Select, SelectItem } from "@tide-design/components";
import { SearchIcon } from "@tide-design/icons";

import type { CustomerStatusFilter } from "../../../libs/filterCustomers";
import { CUSTOMER_STATUS, CUSTOMER_STATUS_ORDER } from "../../../constants/customers";

export interface CustomerToolbarProps {
  query: string;
  status: CustomerStatusFilter;
  onQueryChange: (query: string) => void;
  onStatusChange: (status: CustomerStatusFilter) => void;
}

function isStatusFilter(value: string): value is CustomerStatusFilter {
  return value === "all" || value in CUSTOMER_STATUS;
}

/** 이름·이메일 검색과 상태 필터 */
export function CustomerToolbar({
  query,
  status,
  onQueryChange,
  onStatusChange,
}: CustomerToolbarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <div className="relative flex-1">
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
        {/* tide Input에 앞 장식 자리가 없어 아이콘을 겹치고 여백을 덮어쓴다(docs/tide-gaps.md). */}
        <Input
          type="search"
          aria-label="이름·이메일 검색"
          placeholder="이름 또는 이메일로 검색"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          className="ps-9"
        />
      </div>
      <Select
        aria-label="상태"
        value={status}
        onValueChange={(value) => {
          if (isStatusFilter(value)) onStatusChange(value);
        }}
        className="sm:w-40"
      >
        <SelectItem value="all">모든 상태</SelectItem>
        {CUSTOMER_STATUS_ORDER.map((s) => (
          <SelectItem key={s} value={s}>
            {CUSTOMER_STATUS[s].label}
          </SelectItem>
        ))}
      </Select>
    </div>
  );
}
