import { connection } from "next/server";

import { TIDE_PACKAGES } from "../constants/packages";
import type { GetNpmPackagesResponse, NpmPackage } from "./npmPackages.types";

const REGISTRY_URL = "https://registry.npmjs.org";
const DOWNLOADS_URL = "https://api.npmjs.org/downloads/point/last-week";

/** JSON을 읽는다. 응답이 실패하거나 네트워크 오류면 `null`. */
async function readJson(url: string): Promise<unknown> {
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    return (await res.json()) as unknown;
  } catch {
    return null;
  }
}

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

async function getNpmPackage(name: string): Promise<NpmPackage> {
  const [latest, point] = await Promise.all([
    readJson(`${REGISTRY_URL}/${name}/latest`),
    readJson(`${DOWNLOADS_URL}/${name}`),
  ]);
  const version = isRecord(latest) && typeof latest.version === "string" ? latest.version : null;
  const downloads = isRecord(point) && typeof point.downloads === "number" ? point.downloads : null;

  return {
    name,
    version,
    downloads,
    start: isRecord(point) && typeof point.start === "string" ? point.start : null,
    end: isRecord(point) && typeof point.end === "string" ? point.end : null,
  };
}

/**
 * npm 공개 API에서 tide 패키지 세 개의 최신 버전과 지난 7일 다운로드 수를 읽는다.
 * 렌더 정책: 요청마다 새로 읽는다(`connection()`). 프리렌더 셸에는 호출한 쪽의 `<Suspense>` fallback만 들어간다.
 * 두 API가 모두 아무 값도 주지 않으면 `null`을 돌려 화면이 안내 문구를 보이게 한다.
 */
export async function getNpmPackages(): Promise<GetNpmPackagesResponse | null> {
  await connection();

  const packages = await Promise.all(TIDE_PACKAGES.map(getNpmPackage));
  const empty = packages.every((pkg) => pkg.version === null && pkg.downloads === null);

  return empty ? null : { packages };
}
