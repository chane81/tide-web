// 서버 컴포넌트에서 tide를 'use client' 래퍼 없이 바로 import한다.
import { Button, Typography } from "@tide-design/components";
import { ArrowRightIcon, RocketIcon } from "@tide-design/icons";

export default function Page() {
  return (
    <main className="flex min-h-dvh flex-col items-start justify-center gap-6 p-10">
      <RocketIcon size={40} className="text-primary" />
      <Typography variant="heading-lg">tide-web</Typography>
      <Typography className="text-muted">
        npm 배포본 tide로 대시보드를 만든다. 화면은 다음 티켓부터 채운다.
      </Typography>
      <Button endIcon={<ArrowRightIcon />}>시작하기</Button>
    </main>
  );
}
