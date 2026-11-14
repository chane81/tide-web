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

import { toasts } from "@/libs/toasts";

/** 계정 삭제 버튼과 확인 AlertDialog. 목업이라 확인하면 Toast만 띄운다. */
export function DeleteAccountDialog() {
  return (
    <AlertDialog>
      <DialogTrigger render={<Button color="danger" variant="outline" />}>계정 삭제</DialogTrigger>
      <DialogContent size="sm">
        <DialogTitle>계정을 삭제할까요?</DialogTitle>
        <DialogDescription>
          프로필, 설정, 고객 데이터가 모두 지워지고 되돌릴 수 없습니다.
        </DialogDescription>
        <DialogFooter className="mt-6">
          <DialogClose render={<Button variant="outline" color="neutral" />}>취소</DialogClose>
          <DialogClose
            render={<Button color="danger" />}
            onClick={() =>
              toasts.add({
                title: "계정 삭제를 요청했습니다",
                description: "목업이라 실제로 지우지는 않습니다.",
                color: "danger",
              })
            }
          >
            삭제
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </AlertDialog>
  );
}
