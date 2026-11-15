# 03: 대시보드 `/`도 `(home)` 그룹으로

Status: ready-for-agent
Blocked by: None (can start immediately)
Spec: [../spec.md](../spec.md)

## What to build

규칙 15번(루트 라우트는 `(home)` 그룹, 그 전용 코드는 `app/(home)/_src`)을 `apps/tide-dashboard`에도 적용한다. 지금 대시보드는 예전 규칙대로 개요 화면 전용 코드가 `src/`에 있다.

## Acceptance criteria

- [ ] `apps/tide-dashboard/src/app/page.tsx` → `src/app/(home)/page.tsx`
- [ ] 개요 화면만 쓰는 컴포넌트·api·libs를 `src/app/(home)/_src/*`로 내리고, 여러 라우트가 쓰는 것은 `src/`에 남긴다
- [ ] import 경로 규칙(라우트 안 상대경로, 밖은 `@/`)
- [ ] 루트 검사 다섯 개 통과

## Comments

- tide-site 이동 때 함께 하지 않았다(사용자 결정: 이번엔 tide-site만).
