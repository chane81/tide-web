import { Input } from "@tide-design/components";
import { SearchIcon } from "@tide-design/icons";

/** 검색 입력과 ⌘K 표시. 동작은 없다(명령 팔레트는 범위 밖). */
export function SidebarSearch() {
  return (
    <div className="relative">
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
      <Input type="search" size="sm" aria-label="검색" placeholder="검색" className="ps-9 pe-12" />
      <kbd className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded-sm border border-default px-1.5 text-caption text-muted">
        ⌘K
      </kbd>
    </div>
  );
}
