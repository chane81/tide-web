import { Button, Typography } from "@tide-design/components";
import { DownloadIcon } from "@tide-design/icons";

import { DeleteCustomersDialog } from "./DeleteCustomersDialog";

export interface BulkActionsProps {
  selectedCount: number;
  onExport: () => void;
  onDelete: () => void;
}

/** 고른 수와 일괄 동작(내보내기, 삭제). 고른 고객이 없으면 수만 0으로 보이고 동작은 숨긴다. */
export function BulkActions({ selectedCount, onExport, onDelete }: BulkActionsProps) {
  return (
    <div className="flex min-h-8 flex-wrap items-center gap-3">
      <Typography variant="body-sm" className="text-muted" aria-live="polite">
        {selectedCount > 0 ? `${selectedCount}명 선택됨` : "선택한 고객 없음"}
      </Typography>
      {selectedCount > 0 && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            color="neutral"
            size="sm"
            startIcon={<DownloadIcon />}
            onClick={onExport}
          >
            내보내기
          </Button>
          <DeleteCustomersDialog count={selectedCount} onConfirm={onDelete} />
        </div>
      )}
    </div>
  );
}
