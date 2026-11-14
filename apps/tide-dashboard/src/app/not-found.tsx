import { Button, Typography } from "@tide-design/components";
import { HouseIcon } from "@tide-design/icons";
import NextLink from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-4 text-center">
      <Typography variant="display-md" level={1}>
        404
      </Typography>
      <Typography className="text-muted">
        찾는 페이지가 없습니다. 주소를 다시 확인해 주세요.
      </Typography>
      <Button render={<NextLink href="/" />} startIcon={<HouseIcon />}>
        홈으로
      </Button>
    </div>
  );
}
