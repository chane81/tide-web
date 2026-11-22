import { Link } from "@tide-design/components";

import { getTidePackage } from "@/apis/tidePackage/tidePackage.api";

/** npm에 배포된 tide 최신 버전. `fetch`로 데이터를 읽는 async 서버 컴포넌트 예시다. */
export async function SidebarTideVersion() {
  const pkg = await getTidePackage();
  if (!pkg) return null;

  return (
    <p className="px-2 text-caption text-muted">
      npm 최신{" "}
      <Link
        href={`https://www.npmjs.com/package/${pkg.name}`}
        target="_blank"
        rel="noreferrer"
        color="neutral"
      >
        tide {pkg.version}
      </Link>
    </p>
  );
}
