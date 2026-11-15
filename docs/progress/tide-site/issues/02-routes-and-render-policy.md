# 02: 라우트별 렌더 정책, (home) 그룹, 새 페이지 세 개

Status: done
Blocked by: 01
Spec: [../spec.md](../spec.md)

## What to build

전역 `output: "export"`를 없애고 Cache Components로 라우트마다 렌더 정책을 그 주인 안에 적는다. `/`를 `(home)` 그룹으로 옮기고 홈 전용 코드를 `app/(home)/_src`로 내린다. `/showcase`(사진)·`/catalog`(패키지 카드)·`/stats`(npm 현황, 요청마다)를 더한다. 내비·푸터를 페이지 링크로 바꾼다.

## Acceptance criteria

- [x] `next.config.ts`: `cacheComponents`·`partialPrefetching`(대시보드와 같음), `output` 없음
- [x] 빌드 표시: `/`·`/showcase`·`/credits` ○, `/catalog` ○(1d/1w), `/stats` ◐
- [x] `/stats`: `connection()` + `<Suspense fallback={Skeleton}>`, 실패하면 tide Alert 안내. fetch는 `_src/apis`, 가공은 `_src/libs` + 테스트(fetch 모킹)
- [x] 각 라우트 `metadata`(title·description), 내비 현재 페이지 `aria-current="page"`
- [x] 라우트마다 copy-lint 0 FAIL, 게이트 네 페이지 `GATE: PASS`(면제 5개)
- [x] 규칙 15번을 「`(home)` 그룹 + `app/(home)/_src`」로 고침

## Comments

- 라우트별 렌더(Next.js 16.4.6 `next build`): `○ /`, `○ /catalog (Revalidate 1d, Expire 1w)`, `○ /credits`, `○ /showcase`, `◐ /stats`.
- 게이트 라운드: 홈 2라운드 PASS(라운드 1에 light 바탕의 muted 리드 6.33:1이 7:1 기준에 걸려 면제), showcase는 첫 빌드 1라운드 FAIL(폰 #steps neighbour) 뒤 수정해 새 빌드 1라운드 PASS. catalog는 stats와 같은 빌드 기록을 써서 라운드가 모자라 OPEN으로 끝난 뒤 새 빌드에서 3라운드 PASS. stats는 새 빌드 2라운드 PASS. 게이트 기록(`gate.json`)이 폴더에 하나라 페이지마다 `--start <url> --new`로 새 빌드를 연다.
- 면제 변화: `dark-ground` 삭제(light 기본에서 더는 안 걸림), `text-contrast p.hero__lead` 추가(tide text-muted 6.33:1, AA 4.5:1 통과·키트 7:1 미달).
- `/credits`: 스킬 검사기 credit-wall(푸터에 출처 링크 8개)을 따라 목록을 따로 둔 페이지. 사용자가 고른 이름은 아니고 라이선스 표시 때문에 더했다.
- 대시보드 dev 확인(포트 3022): 다섯 화면 모두 오류 화면 없이 뜨고 `Button render={<NextLink />}`도 `<a>`로 그려진다. 깨지는 것은 서버가 호스트 요소 `<a>`를 넘길 때라 `ButtonLink`는 tide-site에만 둔다(승격하지 않음).
- 커밋: 598b14d(refactor, (home) 그룹·렌더 설정), 4286d20(style, light·surface 띠·히어로 빛), 20830f0(feat, 새 라우트), 이 문서 커밋(docs).
