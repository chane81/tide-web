import { Button } from "@tide-design/components";
import { HouseIcon } from "@tide-design/icons";
import NextLink from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-display-md">404</h1>
      <p className="text-body-md text-muted">찾는 페이지가 없습니다. 주소를 다시 확인해 주세요.</p>
      <Button render={<NextLink href="/" />} startIcon={<HouseIcon />}>
        홈으로
      </Button>
    </div>
  );
}
