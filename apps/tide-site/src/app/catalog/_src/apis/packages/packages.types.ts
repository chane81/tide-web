/** tide 패키지 하나(tide README 「패키지」 표와 각 패키지의 package.json·타입 선언에서 온 사실) */
export interface TidePackage {
  /** 스코프를 뺀 이름(`components`) */
  id: string;
  /** npm 패키지 이름 */
  name: string;
  /** 무엇이 들었는지 한 문장 */
  summary: string;
  /** 설치 명령. foundation처럼 따로 설치하지 않으면 `null` */
  install: string | null;
  /** 설치 명령 대신 적는 한 줄 */
  note: string | null;
}

/** `getPackages` 응답 */
export interface GetPackagesResponse {
  packages: TidePackage[];
}
