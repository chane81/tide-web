# 01: 스캐폴드 + tide 설치 + 도구

Status: done
Blocked by: None (can start immediately)
Spec: [../spec.md](../spec.md)

## What to build

pnpm·TypeScript·Next.js(App Router) 앱을 저장소 루트에 만들고, npm 배포본 tide(`@tide-design/components`·`@tide-design/icons`)를 설치해 첫 화면에 tide 컴포넌트를 띄운다. 이후 모든 티켓이 기대는 검사 명령(타입·lint·포맷·테스트·빌드)이 이 티켓에서 갖춰진다.

## Acceptance criteria

- [x] 외부 의존성 버전은 `pnpm-workspace.yaml` catalog로 관리한다(설치 시점 최신 안정 버전, 설치한 버전을 Comments에 기록).
- [x] 전역 CSS는 tide 설치 안내 그대로 두 줄(`tailwindcss`, tide `styles.css`)이고, 첫 화면에 tide `Button`과 아이콘이 tide 스타일로 보인다.
- [x] tide 컴포넌트를 서버 컴포넌트에서 `'use client'` 래퍼 없이 import한다.
- [x] `@/` 경로 별칭이 `src/`를 가리킨다.
- [x] 스크립트 `dev`·`build`·`typecheck`(`next typegen` 뒤 `tsc --noEmit`)·`test`·`lint`(oxlint, 경고도 실패)·`format`·`format:check`(oxfmt)가 있다.
- [x] Vitest + React Testing Library + jsdom 설정과, tide 컴포넌트를 렌더하는 샘플 테스트 1개가 통과한다.
- [x] `.vscode` 설정: 워크스페이스 TypeScript, oxfmt 저장 시 포맷, 권장 확장(oxc, Tailwind CSS IntelliSense).
- [x] 위 검사 명령이 모두 통과한다.

## Comments

### 2026-11-14 구현 결과

설치 버전(`pnpm-workspace.yaml` catalog, 설치 시점 최신 안정 버전):

| 패키지                                       | 버전    |
| -------------------------------------------- | ------- |
| next                                         | 16.4.6  |
| react · react-dom                            | 19.3.1  |
| @tide-design/components · @tide-design/icons | 0.11.4  |
| tailwindcss · @tailwindcss/postcss           | 4.3.5   |
| postcss                                      | 8.5.33  |
| typescript                                   | 7.0.2   |
| @types/node                                  | 26.6.6  |
| @types/react · @types/react-dom              | 19.3.0  |
| oxlint                                       | 1.93.0  |
| oxfmt                                        | 0.78.0  |
| vitest                                       | 5.1.0   |
| vite                                         | 8.3.8   |
| @vitejs/plugin-react                         | 6.3.0   |
| jsdom                                        | 31.0.1  |
| @testing-library/react                       | 16.3.3  |
| @testing-library/dom                         | 10.4.2  |
| @testing-library/jest-dom                    | 7.0.1   |
| @testing-library/user-event                  | 14.6.10 |

pnpm 12.11.2(`packageManager`), Node 26.

결정·메모:

- TypeScript 7: Next.js 16.4는 `next build`에서 프로젝트의 `tsc` CLI를 쓰므로 추가 설정 없이 동작한다.
- `@/` 별칭: `tsconfig.json` `paths`. Vitest는 Vite 8 내장 `resolve.tsconfigPaths`로 같은 별칭을 읽는다(`vite-tsconfig-paths` 불필요).
- `next.config.ts`: `cacheComponents`·`partialPrefetching` 켬. 규칙 8-2의 `'use cache'`를 쓰기 위함이고, 16.4는 새 앱에 둘을 함께 켜라고 경고한다.
- oxlint: `correctness` 오류, `suspicious` 경고 + `--deny-warnings`. `import/no-unassigned-import`는 CSS와 jest-dom 설정 import만 허용.
- oxfmt 기본값(큰따옴표)을 tide 저장소와 맞춰 그대로 쓴다. 첫 실행에서 기존 문서(`.claude/rules/*`, `docs/tide-gaps.md`)의 코드 블록 따옴표·표 정렬이 바뀌었다.
- 확인: `typecheck`·`lint`·`format:check`·`test`·`build` 모두 통과. `next start` 응답 CSS에 tide Button class(`bg-accent-solid`, `text-label-md` 등)와 `bg-canvas`가 들어 있음을 확인.
- tide 부족한 점: npm 배포본에 README가 없어 설치 안내를 패키지에서 볼 수 없다 → `docs/tide-gaps.md`에 추가.
- 커밋: `a4b4601`(스캐폴드), `c2be289`(기존 규칙 문서 oxfmt 포맷).
