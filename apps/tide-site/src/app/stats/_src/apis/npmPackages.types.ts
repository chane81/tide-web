/** npm에서 읽은 패키지 하나. 두 API 중 하나가 실패하면 그 값만 `null`이다. */
export interface NpmPackage {
  name: string;
  /** registry.npmjs.org의 `latest` 버전 */
  version: string | null;
  /** api.npmjs.org의 지난 7일 다운로드 수 */
  downloads: number | null;
  /** 다운로드 집계 기간(YYYY-MM-DD) */
  start: string | null;
  end: string | null;
}

/** `getNpmPackages` 응답 */
export interface GetNpmPackagesResponse {
  packages: NpmPackage[];
}
