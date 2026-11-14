"use client";

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
} from "@tide-design/components";
import { PlusIcon } from "@tide-design/icons";
import { type FormEvent, useState } from "react";

import { toasts } from "@/libs/toasts";

/** 「카드 추가」 버튼과 다이얼로그. 저장은 목업이라 Toast만 띄우고 목록은 그대로다. */
export function AddCardDialog() {
  const [open, setOpen] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nickname = new FormData(event.currentTarget).get("nickname");
    setOpen(false);
    toasts.add({
      title: "카드를 추가했습니다",
      description: `${typeof nickname === "string" && nickname ? nickname : "새 카드"} (목업이라 목록에는 보이지 않습니다)`,
      color: "success",
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button startIcon={<PlusIcon />} />}>카드 추가</DialogTrigger>
      <DialogContent>
        <DialogTitle>카드 추가</DialogTitle>
        <DialogDescription>결제에 쓸 카드 정보를 입력하세요.</DialogDescription>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Field label="카드 별칭">
            <Input name="nickname" placeholder="예: 업무용" />
          </Field>
          <Field label="카드 번호" required>
            <Input
              name="number"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="0000 0000 0000 0000"
            />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="만료일" required>
              <Input name="expiry" autoComplete="cc-exp" placeholder="MM/YY" />
            </Field>
            <Field label="CVC" required>
              <Input name="cvc" inputMode="numeric" autoComplete="cc-csc" placeholder="123" />
            </Field>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline" color="neutral" />}>취소</DialogClose>
            <Button type="submit">추가</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
