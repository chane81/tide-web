import { getPackages } from "../../apis/packages/packages.api";
import { PackageCard } from "./components/PackageCard";

/**
 * 2번 화면: 패키지 세 개를 tide Card 세 장으로 보인다. 데이터는 `getPackages`(캐시된 목업)에서 읽는다.
 */
export async function PackagesSection() {
  const { packages } = await getPackages();

  return (
    <section className="section" id="packages" aria-labelledby="packages-h">
      <div className="wrap">
        <div className="section-head">
          <h2 id="packages-h">
            패키지 세 개가 한 버전으로 나갑니다.{" "}
            <span className="muted">버전 번호는 npm 현황에서 봅니다.</span>
          </h2>
        </div>
        <div className="grid">
          {packages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}
