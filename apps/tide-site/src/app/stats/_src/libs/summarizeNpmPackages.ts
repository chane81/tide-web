import type { NpmPackage } from "../apis/npmPackages.types";

/** 표 한 줄 */
export interface NpmPackageRow {
  name: string;
  /** 스코프를 뺀 짧은 이름(`components`) */
  label: string;
  version: string;
  downloads: string;
}

export interface NpmPackagesSummary {
  rows: NpmPackageRow[];
  /** 세 패키지 다운로드 합계. 하나라도 비면 `null` */
  total: string | null;
  /** 집계 기간(「11월 7일 ~ 11월 13일」). 모르면 `null` */
  period: string | null;
  /** 세 패키지의 버전이 모두 같으면 그 버전, 아니면 `null` */
  sharedVersion: string | null;
}

/** 값이 없을 때 표에 쓰는 말 */
export const MISSING = "읽지 못함";

const numberFormat = new Intl.NumberFormat("ko-KR");

/** `2026-11-07` → `11월 7일`. 시간대에 따라 날짜가 밀리지 않게 문자열로 나눈다. */
export function formatDay(date: string): string | null {
  const match = /^\d{4}-(\d{2})-(\d{2})$/.exec(date);
  if (!match) return null;
  return `${Number(match[1])}월 ${Number(match[2])}일`;
}

/** npm에서 읽은 패키지들을 표·요약 카드에 넣을 글자로 바꾼다. */
export function summarizeNpmPackages(packages: NpmPackage[]): NpmPackagesSummary {
  const rows = packages.map((pkg) => ({
    name: pkg.name,
    label: pkg.name.replace(/^@[^/]+\//, ""),
    version: pkg.version ?? MISSING,
    downloads: pkg.downloads === null ? MISSING : `${numberFormat.format(pkg.downloads)}회`,
  }));

  const counts = packages.map((pkg) => pkg.downloads);
  const total = counts.every((n): n is number => n !== null)
    ? `${numberFormat.format(counts.reduce((sum, n) => sum + n, 0))}회`
    : null;

  const withPeriod = packages.find((pkg) => pkg.start && pkg.end);
  const start = withPeriod?.start ? formatDay(withPeriod.start) : null;
  const end = withPeriod?.end ? formatDay(withPeriod.end) : null;

  const versions = new Set(packages.map((pkg) => pkg.version));
  const [only] = versions;

  return {
    rows,
    total,
    period: start && end ? `${start} ~ ${end}` : null,
    sharedVersion: versions.size === 1 && only ? only : null,
  };
}
