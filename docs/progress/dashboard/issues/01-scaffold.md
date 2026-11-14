# 01: 스캐폴드 + tide 설치 + 도구

Status: ready-for-agent
Blocked by: None (can start immediately)
Spec: [../spec.md](../spec.md)

## What to build

pnpm·TypeScript·Next.js(App Router) 앱을 저장소 루트에 만들고, npm 배포본 tide(`@tide-design/components`·`@tide-design/icons`)를 설치해 첫 화면에 tide 컴포넌트를 띄운다. 이후 모든 티켓이 기대는 검사 명령(타입·lint·포맷·테스트·빌드)이 이 티켓에서 갖춰진다.

## Acceptance criteria

- [ ] 외부 의존성 버전은 `pnpm-workspace.yaml` catalog로 관리한다(설치 시점 최신 안정 버전, 설치한 버전을 Comments에 기록).
- [ ] 전역 CSS는 tide 설치 안내 그대로 두 줄(`tailwindcss`, tide `styles.css`)이고, 첫 화면에 tide `Button`과 아이콘이 tide 스타일로 보인다.
- [ ] tide 컴포넌트를 서버 컴포넌트에서 `'use client'` 래퍼 없이 import한다.
- [ ] `@/` 경로 별칭이 `src/`를 가리킨다.
- [ ] 스크립트 `dev`·`build`·`typecheck`(`next typegen` 뒤 `tsc --noEmit`)·`test`·`lint`(oxlint, 경고도 실패)·`format`·`format:check`(oxfmt)가 있다.
- [ ] Vitest + React Testing Library + jsdom 설정과, tide 컴포넌트를 렌더하는 샘플 테스트 1개가 통과한다.
- [ ] `.vscode` 설정: 워크스페이스 TypeScript, oxfmt 저장 시 포맷, 권장 확장(oxc, Tailwind CSS IntelliSense).
- [ ] 위 검사 명령이 모두 통과한다.

## Comments
