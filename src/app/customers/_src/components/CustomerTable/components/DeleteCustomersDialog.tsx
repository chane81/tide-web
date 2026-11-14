import {
  AlertDialog,
  Button,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@tide-design/components";
import { TrashIcon } from "@tide-design/icons";

export interface DeleteCustomersDialogProps {
  /** 지울 고객 수 */
  count: number;
  onConfirm: () => void;
}

/** 일괄 삭제 버튼과 확인 AlertDialog. 확인해야만 `onConfirm`을 부른다. */
export function DeleteCustomersDialog({ count, onConfirm }: DeleteCustomersDialogProps) {
  return (
    <AlertDialog>
      <DialogTrigger
        render={<Button variant="outline" color="danger" size="sm" startIcon={<TrashIcon />} />}
      >
        삭제
      </DialogTrigger>
      <DialogContent size="sm">
        <DialogTitle>고객 {count}명을 삭제할까요?</DialogTitle>
        <DialogDescription>삭제한 고객은 목록에서 사라지고 되돌릴 수 없습니다.</DialogDescription>
        <DialogFooter className="mt-6">
          <DialogClose render={<Button variant="outline" color="neutral" />}>취소</DialogClose>
          <DialogClose render={<Button color="danger" />} onClick={onConfirm}>
            삭제
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </AlertDialog>
  );
}
