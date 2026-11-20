# 0003. pnpm workspace + Turborepo 모노레포

- 상태: 채택
- 날짜: 2026-11-14
- 대체: [0001](0001-single-app-colocation.md)

## 맥락

대시보드에 더해 tide 디자인 시스템을 소개하는 마케팅 사이트를 만든다. 앱이 둘이 되어 0001의 "앱이 둘 이상이 되면 다시 검토한다" 조건에 닿았다. 두 앱은 테마 전환처럼 범용 코드를 함께 쓴다.

## 결정

- 앱은 `apps/tide-admin`(기존 대시보드), `apps/tide-site`(tide 소개 사이트)에 둔다.
- pnpm workspace + Turborepo. 외부 의존성 버전은 `pnpm-workspace.yaml`의 `catalog`에서만 정한다(`catalogMode: strict`).
- 구조 규칙은 [fe-monorepo-architecture](https://github.com/chane81/fe-monorepo-architecture)의 규칙을 이 저장소에 맞춘 `.claude/rules/fe-monorepo-structure.md`를 따른다.
- 참고 저장소와 다른 점:
  - 린트·포맷은 ESLint·Prettier 대신 지금 쓰는 oxlint·oxfmt를 루트에서 한 번에 돌린다. 패키지 → 앱 import 금지는 oxlint `overrides` + `no-restricted-imports`로 막는다(ESLint `boundaries` 대신).
  - desktop·mobile 분기는 없다. 두 앱 모두 반응형 한 벌이다.
  - CI/CD·Docker 이미지는 두지 않는다. 확인용 저장소다.
- tide는 계속 **npm에 배포된 버전**을 설치한다(0001과 같음).

## 결과

- 두 앱이 함께 쓰는 범용 코드는 `packages/shared/*`(Rslib로 `dist` 빌드)에 둔다.
- 검사 명령은 루트에서 돌린다: `pnpm typecheck`·`lint`·`format:check`·`test`·`build`.
- 문서(`docs/tide-gaps.md`, ADR, 트래커)는 저장소 루트 `docs/`에 그대로 둔다. tide-gaps의 코드 경로는 앱 이름부터 적는다.
- 렌더 정책은 앱 전역 설정(`output: "export"`)이 아니라 라우트마다 그 주인 안에 적는다: 두 앱 모두 `cacheComponents`·`partialPrefetching`을 켜고, 정적은 `'use cache'`+`cacheLife()` 또는 기본 프리렌더, 요청마다는 `connection()`+`<Suspense>`(tide-site `/stats`).
